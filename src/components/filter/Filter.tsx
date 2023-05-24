import {Button, Card, Flex, Group, Input, Loader, Select, Text} from "@mantine/core";
import React, {ChangeEvent, useCallback, useState} from "react";
import {useGetCataloguesQuery} from "../../store/superJobAPI";
import {URLSearchParamsInit} from "react-router-dom/dist/dom";
import {FilterParamsType} from "../../pages/main/SearchVacanciesPage";

type FilterPropsType = {
    keyWordParam: string
    setSearchParams: (arg: URLSearchParamsInit) => void
    fetchVacancies: (arg: FilterParamsType) => void
    filterParams: FilterParamsType
}

export const Filter = React.memo((props: FilterPropsType) => {

        const {data, isLoading} = useGetCataloguesQuery()
        const [industryValue, setIndustryValue] = useState<string | null>(props.filterParams.catalogues);
        const [payFromValue, setPayFromValue] = useState<string>(props.filterParams.payment_from);
        const [payToValue, setPayToValue] = useState<string>(props.filterParams.payment_to);
        const [isActive, setIsActive] = useState<boolean>(false)


        const handleFilterSearch = () => {
            debugger
            let filter: FilterParamsType = {...props.filterParams, keyword: props.keyWordParam}

            if (industryValue !== props.filterParams.catalogues) {
                filter = {
                    ...props.filterParams,
                    catalogues: industryValue === null ? '' : industryValue.toString()
                }
            }
            if (payFromValue !== props.filterParams.payment_from) {
                filter = {...props.filterParams, payment_from: payFromValue.toString()}
            }
            if (payToValue !== props.filterParams.payment_to) {
                filter = {...props.filterParams, payment_to: payToValue.toString()}
            }

            props.setSearchParams(filter)
            props.fetchVacancies(filter)
        }

        const handleClearButton = useCallback(() => {
            setIndustryValue('')
            setPayToValue('')
            setPayFromValue('')
            props.setSearchParams({
                catalogues: '',
                payment_from: '',
                payment_to: '',
                keyword: props.keyWordParam,
            })
        }, [props.keyWordParam])

        return <Card w={'315px'} h={'360px'} shadow="sm" padding="20px" radius="12px"
                     sx={{
                         overflow: 'visible'
                     }}
        >
            <Text weight={700} size={20} lh={'20px'} pb={'32px'}
                  sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
            >
                Фильтры
                <Group>
                    <Button variant="subtle" c="#ACADB9" size="sm"
                            onClick={handleClearButton}
                            styles={{
                                root: {
                                    height: 'auto',
                                    padding: 0,
                                    '&:hover': {
                                        color: '#92C1FF',
                                        backgroundColor: 'inherit',
                                    },
                                    '&:active': {
                                        color: '#5E96FC',
                                    }
                                },
                                label: {
                                    gap: '9px',
                                    fontWeight: 500,
                                }
                            }}
                    >
                        Сбросить все <span>&#10005;</span>
                    </Button>
                </Group>
            </Text>

            <Text weight={700} lh={'20px'}>
                Отрасль

                <Select data-elem="industry-select" mt={'8px'} size="md" radius={'8px'}
                        icon={isLoading && <Loader size="sm" color="#ACADB9"/>}
                        placeholder="Выберете отрасль"
                        rightSection={
                            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1"
                                      stroke={isActive ? "#5E96FC" : "#ACADB9"} strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        }
                        rightSectionWidth={30}
                        allowDeselect
                        value={industryValue}
                        onChange={setIndustryValue}
                        onDropdownOpen={() => setIsActive(true)}
                        onDropdownClose={() => setIsActive(false)}
                        styles={{
                            rightSection: {pointerEvents: 'none', transform: `${isActive && 'rotate(180deg)'}`},
                            item: {whiteSpace: 'initial', fontWeight: 400, fontSize: '14px', lineHeight: '20px'},
                            input: {fontSize: '14px', caretColor: '#3B7CD3', '&:hover': {borderColor: '#5E96FC'}},
                        }}
                        data={data ? data.map(d => ({label: d.title, value: d.key.toString()})) : []}
                />
            </Text>

            <Text weight={700} lh={'20px'} mt={'20px'}>
                Оклад

                <Input data-elem="salary-from-input"
                       rightSection={<Flex direction={'column'} gap={'11px'}>
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path
                                   d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5"
                                   stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                           </svg>
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path
                                   d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5"
                                   stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                           </svg>
                       </Flex>
                       }
                       rightSectionWidth={30}
                       value={payFromValue}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setPayFromValue(e.target.value)}
                       placeholder="От"
                       size="md"
                       mt={'8px'}
                       radius="8px"
                       styles={{
                           input: {fontSize: '14px', caretColor: '#3B7CD3', '&:hover': {borderColor: '#5E96FC'}},
                       }}
                />
                <Input data-elem="salary-to-input"
                       rightSection={<Flex direction={'column'} gap={'11px'}>
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path
                                   d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5"
                                   stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                           </svg>
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path
                                   d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5"
                                   stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                           </svg>
                       </Flex>
                       }
                       rightSectionWidth={30}
                       value={payToValue}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setPayToValue(e.target.value)}
                       placeholder="До"
                       size="md"
                       mt={'8px'}
                       radius="8px"
                       styles={{
                           input: {fontSize: '14px', caretColor: '#3B7CD3', '&:hover': {borderColor: '#5E96FC'}},
                       }}
                />
            </Text>

            <Button data-elem="search-button"
                    size="sm" fullWidth mt={'20px'} radius={'8px'}
                    onClick={handleFilterSearch}
                    sx={{
                        backgroundColor: '#5E96FC',
                        '&:hover': {backgroundColor: '#92C1FF'},
                        '&:active': {backgroundColor: '#3B7CD3'}
                    }}
            >
                Применить
            </Button>
        </Card>
    }
)
