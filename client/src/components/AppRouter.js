import React from 'react';
import {Routes, Route, Navigate, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {START_ROUTE} from "../utils/consts";

const AppRouter = () => {
    // вынесен сюда роутинг
    /*
    isAuth Должен быть норм.
    Если токен просрочен на бэке, то на клиенте он всё равно остается в localstorage и данное условие проходит
    */
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