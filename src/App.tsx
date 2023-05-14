import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {HeaderComponent} from "./components/header/HeaderComponent";
import {AppShell, Header} from "@mantine/core";
import {SearchVacanciesPage} from "./pages/main/SearchVacanciesPage";
import {FavoritePage} from "./pages/favorite/FavoritePage";
import {useGetTokenQuery} from "./store/superJobAPI";
import {skipToken} from "@reduxjs/toolkit/query";

function App() {
    const skip = !!localStorage.getItem('token')
    const {data, isLoading} = useGetTokenQuery(skip ? skipToken : undefined)

    if (data && data.access_token !== null) localStorage.setItem('token', data.access_token)

    return <AppShell
        padding='md'
        header={<Header height={84}><HeaderComponent/></Header>}
        styles={() => ({
            main: { backgroundColor: '#f5f5f5' },
        })}
    >
        {isLoading ? <div>Loading...</div> :
        <Routes>

            <Route path={'/'} element={<SearchVacanciesPage/>}/>
            <Route path={'/favorite'} element={<FavoritePage/>}/>
            <Route path='*' element={<div>NOT FOUND 404</div>}/>
        </Routes> }
    </AppShell>
}

export default App;
