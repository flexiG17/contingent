import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {START_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const isAuth = localStorage.getItem("jwt")
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            <Route path="*" element={<Navigate to={START_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;