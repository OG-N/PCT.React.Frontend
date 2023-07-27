import "react-app-polyfill/stable";

import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "chart.js/auto";

import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./authConfig";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const msalInstance = new PublicClientApplication(msalConfig);

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();
export const LanguageContext = createContext();
export const DateTimeFormatContext = createContext();

const AppWrapper = () => {
    const language = navigator.language.split(/[-_]/)[0] || "en";
    const [selectedLanguage, setSelectedLanguage] = useState(language);
    React.useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const [dateFormat, setDateFormat] = useState(i18n.options.format.date);
    const [timeFormat, setTimeFormat] = useState(i18n.options.format.time);
    const [timeZoneFormat, setTimeZoneFormat] = useState(i18n.options.format.timeZone);

    React.useEffect(() => {
        i18n.options.format.date = dateFormat;
    }, [dateFormat]);
    React.useEffect(() => {
        i18n.options.format.time = timeFormat;
    }, [timeFormat]);
    React.useEffect(() => {
        i18n.options.format.timeZone = timeZoneFormat;
    }, [timeZoneFormat]);

    return (
        <BrowserRouter>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <MsalProvider instance={msalInstance}>
                        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
                            <DateTimeFormatContext.Provider value={{ dateFormat, setDateFormat, timeFormat, setTimeFormat, timeZoneFormat, setTimeZoneFormat }}>
                                <I18nextProvider i18n={i18n}>
                                    <App />
                                </I18nextProvider>
                            </DateTimeFormatContext.Provider>
                        </LanguageContext.Provider>
                    </MsalProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

root.render(<AppWrapper />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
