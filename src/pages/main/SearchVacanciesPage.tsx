import {Box, Button, Card, Flex, Input, Loader, Text} from "@mantine/core";
import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {useLazyFetchVacanciesQuery} from "../../store/superJobAPI";
import {Filter} from "../../components/filter/Filter";
import {useNavigate, useSearchParams} from "react-router-dom";

export type FilterParamsType = {
    published: string
    count: string
    catalogues: string
    payment_from: string
    payment_to: string
    keyword: string
    ids: Array<string>
}

export const SearchVacanciesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({published: '1', count: '4'})
    const keywordParam = searchParams.get('keyword') || ''
    const industryParam = searchParams.get('catalogues') || ''
    const payFromParam = searchParams.get('payment_from') || ''
    const payToParam = searchParams.get('payment_to') || ''

    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        published: '1',
        count: '4',
        catalogues: industryParam,
        payment_from: payFromParam,
        payment_to: payToParam,
        keyword: keywordParam,
        ids: [],
    })
    const [favoritesID, setFavoritesID] = useState<Array<string>>(Object.values(JSON.parse(localStorage.getItem('favorite') as string)))


    const [fetchVacancies, {data, isLoading}] = useLazyFetchVacanciesQuery()
    const navigate = useNavigate()
    useEffect(() => {
        fetchVacancies(filterParams)

        if (localStorage.getItem('favorite') === null) localStorage.setItem('favorite', JSON.stringify({}))
    }, [])

    const showVacancy = (e: MouseEvent<HTMLDivElement>) => {

        navigate("/vacancy", {state: {vacancyID: e.currentTarget.id, favoritesID}})
    }

    const fetchWithParams = () => {
        setSearchParams(filterParams)

        fetchVacancies(filterParams)
    }

    const handleFavorite = (id: number, e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()

        let arrFavorite: { [key: number]: string }
        arrFavorite = JSON.parse(localStorage.getItem('favorite') as string)

        if (arrFavorite === null) {
            arrFavorite = {[id]: `${id}`}
        } else {
            Object.values(arrFavorite).includes(id.toString()) ? delete arrFavorite[id] : arrFavorite[id] = `${id}`
        }
        localStorage.setItem('favorite', JSON.stringify(arrFavorite))
        setFavoritesID(Object.values(arrFavorite))
    }
    return <Flex gap="28px" direction={{base: 'column', sm: 'row'}} align={{base: 'center', sm: 'initial'}}>

        <Filter setSearchParams={setSearchParams}
                keyWordParam={filterParams.keyword} fetchVacancies={fetchVacancies}
                filterParams={filterParams} isLoading={isLoading}
        />

        <Box
            sx={() => ({
                width: '773px',
                height: '100%',
                '@media (max-width: 1150px)': {
                    width: '100%'
                }
            })}
        >

            <Input data-elem="search-input"
                   icon={
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M11.468 11.468L14.5714 14.5714M13.0924 7.54622C13.0924 10.6093 10.6093 13.0924 7.54622 13.0924C4.48313 13.0924 2 10.6093 2 7.54622C2 4.48313 4.48313 2 7.54622 2C10.6093 2 13.0924 4.48313 13.0924 7.54622Z"
                               stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                       </svg>
                   }
                   rightSection={
                       <Button data-elem="search-button"
                               radius="md" fw={500} lh={'21px'} loading={isLoading}
                               loaderPosition="center"
                               onClick={fetchWithParams}
                               sx={{
                                   backgroundColor: '#5E96FC',
                                   '&:hover': {backgroundColor: '#92C1FF'},
                                   '&:active': {backgroundColor: '#3B7CD3'}
                               }}
                       >
                           Поиск
                       </Button>
                   }
                   value={filterParams.keyword}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterParams(prevState => ({
                       ...prevState,
                       keyword: e.target.value
                   }))}
                   rightSectionWidth={102}
                   placeholder="Введите название вакансии"
                   size="48px"
                   radius="8px"
                   w={'100%'}
                   styles={() => ({
                       input: {
                           fontSize: '14px',
                           paddingBottom: '12px',
                           paddingTop: '12px',
                           caretColor: '#3B7CD3'
                       },
                   })}
            />

            {isLoading && <Flex mih={'100vh'} justify="center" align="center"><Loader size='xl'/></Flex>}

            {data?.objects.map(object =>

                <Card key={object.id} id={`${object.id}`} data-elem={`vacancy-${object.id}`} shadow="sm"
                      padding="xl" radius="12px"
                      mt={16}
                      sx={{display: 'flex', flexDirection: 'column', gap: '13px', cursor: 'pointer'}}
                      onClick={(e) => showVacancy(e)}
                >

                    <Text weight={600} size={20} lineClamp={1} c={'#5E96FC'} lh={'24px'}
                          sx={{
                              display: 'flex', justifyContent: 'space-between'
                          }}
                    >
                        {object.profession}
                        <svg data-elem={`vacancy-${object.id}-shortlist-button`}
                             width="24" height="24" viewBox="0 0 24 24"
                             onClick={(e) => handleFavorite(object.id, e)}
                             fill={favoritesID?.includes(object.id.toString()) ? "#5E96FC" : "none"}
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z"
                                stroke={favoritesID?.includes(object.id.toString()) ? "#5E96FC" : "#ACADB9"}
                                strokeWidth="1.5"/>
                        </svg>
                    </Text>

                    <Text weight={400} lh={'20px'}
                          sx={{
                              display: 'flex', alignItems: 'center', gap: '12px'
                          }}
                    >
                        <Text span weight={600}>
                            з/п {object.payment_from == 0 ? 'по договоренности' : `от ${object.payment_from} ${object.currency}`}
                        </Text>
                        <span style={{color: '#7B7C88'}}> • </span>
                        {object.type_of_work.title}
                    </Text>

                    <Text weight={400} lh={'19px'}
                          sx={{
                              display: 'flex', alignItems: 'center', gap: '11.33px'
                          }}
                    >
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.714 12.8807C11.9335 13.6612 10.3013 15.2935 9.17814 16.4166C8.52727 17.0675 7.47304 17.0678 6.82217 16.4169C5.7186 15.3134 4.11797 13.7127 3.28593 12.8807C0.682439 10.2772 0.682439 6.05612 3.28593 3.45262C5.88943 0.849126 10.1105 0.849126 12.714 3.45262C15.3175 6.05612 15.3175 10.2772 12.714 12.8807Z"
                                stroke="#ACADB9" strokeWidth="1.25" strokeLinecap="round"
                                strokeLinejoin="round"/>
                            <path
                                d="M10.5 8.16667C10.5 9.54738 9.38069 10.6667 7.99998 10.6667C6.61927 10.6667 5.49998 9.54738 5.49998 8.16667C5.49998 6.78595 6.61927 5.66667 7.99998 5.66667C9.38069 5.66667 10.5 6.78595 10.5 8.16667Z"
                                stroke="#ACADB9" strokeWidth="1.25" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                        {object.town.title}
                    </Text>
                </Card>
            )}
        </Box>
    </Flex>
}