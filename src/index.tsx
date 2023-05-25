import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MantineProvider} from '@mantine/core';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <MantineProvider theme={{fontFamily: 'Inter'}}>
                    <App/>
                </MantineProvider>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);

