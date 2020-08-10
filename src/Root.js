import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from 'App';
import { CookiesProvider } from "react-cookie";

const Root = () => {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </CookiesProvider>
    );
};

export default Root;