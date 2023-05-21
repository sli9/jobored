import {Button, Card, Group, Loader, Select, Text} from "@mantine/core";
import React, {useState} from "react";
import {useGetCataloguesQuery} from "../../store/superJobAPI";

export const Filter = () => {

    const {data, isLoading} = useGetCataloguesQuery()
    const [industryValue, setIndustryValue] = useState<string | null>(null);
    const [payFromValue, setPayFromValue] = useState<string | null>(null);
    const [payToValue, setPayToValue] = useState<string | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false)

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

            <Select mt={'8px'} size="md" radius={'8px'}
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

            <Select mt={'8px'} size="md" radius={'8px'}
                    placeholder="От"
                    searchable
                    value={payFromValue}
                    onChange={setPayFromValue}
                    styles={{
                        input: {fontSize: '14px', caretColor: '#3B7CD3', '&:hover': {borderColor: '#5E96FC'}},
                    }}
                    data={[]}
            />
            <Select mt={'8px'} size="md" radius={'8px'}
                    placeholder="До"
                    searchable
                    value={payToValue}
                    onChange={setPayToValue}
                    styles={{
                        input: {fontSize: '14px', caretColor: '#3B7CD3', '&:hover': {borderColor: '#5E96FC'}},
                    }}
                    data={[]}
            />
        </Text>

        <Button size="sm" fullWidth mt={'20px'} radius={'8px'}
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
