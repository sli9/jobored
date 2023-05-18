import {Header, Text} from "@mantine/core";
import {NavLink} from "react-router-dom";
import React from "react";
import './HeaderComponent.css'

export const HeaderComponent = () => {

    return <Header height={{base: 84}} p="md">
        <div style={{display: 'flex', alignItems: 'center', height: '100%', position: 'relative'}}>
            <div className='App-logo'>

                <Text className={'App-logo-text'} size='xl'>
                    Jobored
                </Text>
            </div>

            <div className={'App-nav'}>
                <Text component={NavLink} variant='navLink' to='/'>
                    Поиск Вакансий
                </Text>
                <Text component={NavLink} variant='navLink' to='/favorite'>
                    Избранное
                </Text>
            </div>

        </div>
    </Header>
}