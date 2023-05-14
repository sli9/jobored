import {Header, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import React from "react";
import './HeaderComponent.css'

export const HeaderComponent = () => {
    return <Header height={{base: 84, md: 84}} p="md">
        <div style={{display: 'flex', alignItems: 'center', height: '100%', position: 'relative'}}>
            <div className='App-logo'>

                <Text className={'App-logo-text'} size='xl'>
                    Jobored
                </Text>
            </div>

            <div className={'App-nav'}>
                <Text component={Link} variant='link' to='/'>
                    Поиск Вакансий
                </Text>
                <Text component={Link} variant='link' to='/favorite'>
                    Избранное
                </Text>
            </div>

        </div>
    </Header>
}