import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MantineProvider} from '@mantine/core';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={"/jobored"}>
                <MantineProvider theme={{fontFamily: 'Inter'}}>
                    <App/>
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
