import React, { createContext, useState, useEffect } from "react";
import { useRoutes, Outlet, useNavigate } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { userUpdateInfo } from "./components/auth/userUpdateInfo";
import { routesUpdateInfo } from "./components/auth/routesUpdateInfo";
import { getPermissionsForUser } from "./components/auth/getPermissionsForUser";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import createTheme from "./theme";
import routes from "./routes";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";
import createEmotionCache from "./utils/createEmotionCache";
import { AuthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

export const FilteredRoutesContext = createContext([]);
export const PermissionsContext = createContext([]);

// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider } from "@azure/msal-react";
// import { msalConfig } from "./authConfig";
// import { AuthProvider } from "./contexts/JWTContext";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";
// import { AuthProvider } from "./contexts/CognitoContext";

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
   const [userPermissions, setUserPermissions] = React.useState(null);
   const [updatedRoutes, setRoutes] = React.useState([]);
   const resultAuth = useMsalAuthentication(InteractionType.Redirect);
   const [filteredRoutesContext, setFilteredRoutes] = useState([]);
   const [permissionsContext, setPermissionsContext] = useState([]);

   const { instance, accounts, inProgress } = useMsal();
   const user = accounts && accounts.length > 0 ? accounts[0] : null;

   const enableSecurity = false;
   //Update information into the DB with information from Microsoft Azure
   //Get permissions of the user
   React.useEffect(() => {
        const updateUserAndFetchPermissions = async () => {
            if (user) {
                await userUpdateInfo(user);
                const permissions = await getPermissionsForUser(user);
                if (permissions) {

                    setUserPermissions(permissions);
                    //read permission to enable route
                    const filteredPermissions = permissions.filter((permission) => permission.category === "Read");
                    //filter route based on permissions
                    const filteredRoutes = routes.map((route) => {
                        const sanitizedPath = route.path.replace(/\//g, "");

                        //Exception: always enable "auth"
                        if (sanitizedPath == "auth") {
                            return route;
                        }

                        if (!filteredPermissions.some((permission) => permission.route.replace(/\//g, "") === sanitizedPath) && sanitizedPath !== '') {
                            return { ...route, disabled: true };
                        }

                        if (route.children && route.children.length > 0) {
                            const filteredChildren = route.children.map((child) => {
                                const sanitizedChildPath = child.path.replace(/\//g, "");
                                if (!filteredPermissions.some((permission) => (permission.route.includes(sanitizedPath) && permission.route.includes(sanitizedChildPath))) && !(sanitizedChildPath == "")) {
                                    return { ...child, disabled: true };
                                }
                                return child;
                            }).filter(child => !child.disabled || !enableSecurity);

                            return { ...route, children: filteredChildren };
                        }

                        return route;
                    }).filter(route => !route.disabled || !enableSecurity);
                    setRoutes(filteredRoutes);
                    setFilteredRoutes(filteredRoutes);

                    //set other permissions to context
                    try {
                        const CreateUpdatePermissions = permissions.filter((permission) => permission.category === "Write" || permission.category === "Update");
                        setPermissionsContext(CreateUpdatePermissions);
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                }
            }
        };
        updateUserAndFetchPermissions();
   }, [user]);  
   //Update routes information in the DataBase
   React.useEffect(() => {
       const updateRoutesInformationDB = async () => {
           if (routes) {
               await routesUpdateInfo(routes);
           }
       };
       updateRoutesInformationDB();
   }, [routes]);  
  //const content = useRoutes(routes);
  const content = useRoutes(updatedRoutes);
  const navigate = useNavigate();
  const { theme } = useTheme();


  useEffect(() => {
     if (!content && user && updatedRoutes && updatedRoutes.length >0) {
         navigate('/');
     }
  }, [content, user, updatedRoutes, navigate]);

  return (
  <FilteredRoutesContext.Provider value={filteredRoutesContext}>           
   <PermissionsContext.Provider value={permissionsContext}>
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet
          titleTemplate="%s | LIT"
          defaultTitle="LIT - Home"
        />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiThemeProvider theme={createTheme(theme)}>
              <AuthenticatedTemplate>{content}</AuthenticatedTemplate>
            </MuiThemeProvider>
          </LocalizationProvider>
        </Provider>
      </HelmetProvider>
              </CacheProvider>
    </PermissionsContext.Provider>
   </FilteredRoutesContext.Provider>
  );
}

export default App;