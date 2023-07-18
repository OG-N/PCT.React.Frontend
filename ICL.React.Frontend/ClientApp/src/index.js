import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-app-polyfill/stable";
import "chart.js/auto";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { msalConfig } from "./authConfig";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();
const msalInstance = new PublicClientApplication(msalConfig);
export const LanguageContext = createContext();

const AppWrapper = () => {
    const language = navigator.language.split(/[-_]/)[0] || "en";
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    React.useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    return (
        <BrowserRouter>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <MsalProvider instance={msalInstance}>
                        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
                            <I18nextProvider i18n={i18n}>
                                <App />
                            </I18nextProvider>
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