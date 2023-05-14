import {Button, Card, Group, Input, Loader, Text} from "@mantine/core";
import React from "react";
import {useFetchVacanciesQuery} from "../../store/superJobAPI";
import "./VacanciesPage.css"

export const SearchVacanciesPage = () => {
    const {data, isLoading} = useFetchVacanciesQuery()

    return <div className={'Container'}>

        <Input className={'SearchInput'}
               icon={
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M11.468 11.468L14.5714 14.5714M13.0924 7.54622C13.0924 10.6093 10.6093 13.0924 7.54622 13.0924C4.48313 13.0924 2 10.6093 2 7.54622C2 4.48313 4.48313 2 7.54622 2C10.6093 2 13.0924 4.48313 13.0924 7.54622Z"
                           stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                   </svg>
               }
               rightSection={<Button radius="md" className={'Button'}>Поиск</Button>}
               rightSectionWidth={102}
               placeholder="Введите название вакансии"
               size="lg"
               radius="md"
        />

        {isLoading && <div className={'Loader'}><Loader size='xl'/></div>}

        {data?.objects.map(object =>

            <Card key={object.id} data-elem={`vacancy-${object.id}`} className={'Card'} shadow="sm" padding="lg"
                  radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={600}>
                        {object.profession}
                    </Text>
                </Group>
                <Text size="sm">
                    з/п от {object.payment_from} {object.currency}
                    <span className={'Dot'}> • </span>
                    {object.type_of_work.title}
                </Text>

                <Text size="sm">
                    <svg width="13.33" height="16.09" viewBox="0 0 18 21" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.6569 14.6569C13.7202 15.5935 11.7616 17.5521 10.4138 18.8999C9.63275 19.681 8.36768 19.6814 7.58663 18.9003C6.26234 17.576 4.34159 15.6553 3.34315 14.6569C0.218951 11.5327 0.218951 6.46734 3.34315 3.34315C6.46734 0.218951 11.5327 0.218951 14.6569 3.34315C17.781 6.46734 17.781 11.5327 14.6569 14.6569Z"
                            stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z"
                            stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                        fontSize: '16px',
                        paddingLeft: '12px',
                        verticalAlign: "text-bottom"
                    }}>{object.town.title}</span>
                </Text>
            </Card>
        )}
    </div>
}