import React from "react";
import {
    geticl_options_route,
    geticl_options_route_byid,
    newicl_options_route,
    newicl_options_route_batch,
    updateicl_options_route,
    updateicl_options_route_batch,
    deleteicl_options_route,
} from "../../api/icl_options_route";
import { useMutation, useQuery } from "@tanstack/react-query";

export const routesUpdateInfo = async (routes) => {   
    if (!routes) {
        return;
    }
    try {
        const existingRoutes = await geticl_options_route();
        await updateExistingRoutes(existingRoutes, routes);
    } catch (error) {
        console.error("An error occurred:", error);
    }

};

const updateExistingRoutes = async (existingDBRoutes, actualRoutes) => {
    if (existingDBRoutes && existingDBRoutes.data) {
        const existingRoute = existingDBRoutes.data.map((optionRoute) => optionRoute.route);
        const transformedRoutes = actualRoutes.reduce((acc, route) => {
            if (route.path && route.path.trim() !== "" && route.path !== "auth" && route.path !== "*") {
                acc.push({ category: route.path, route: route.path });
                if (route.children && route.children.length > 0) {
                    route.children.forEach(child => {
                        if (child.path && child.path.trim() !== "" && child.path !== "auth" && child.path !== "*") {
                            let concatenatedPath = route.path;
                            if (!route.path.endsWith('/') && !child.path.startsWith('/')) {
                                concatenatedPath += '/';
                            }
                            concatenatedPath += child.path;
                            acc.push({ category: route.path, route: concatenatedPath });
                        }
                    });
                }
            }
            return acc;
        }, []);

        const newRoute = transformedRoutes.filter((optionRoute) => !existingRoute.includes(optionRoute.route));
        if (newRoute && newRoute.length > 0) {
            const newRouteData = newRoute.map((optionRoute) => ({
                category: optionRoute.category,
                name: "",
                route: optionRoute.route                
            }));
            await newicl_options_route_batch(newRouteData);
        }
    }
};
