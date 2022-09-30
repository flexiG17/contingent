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
    const jwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJlbWFpbCI6InNlbnlhQG1haWwucnUiLCJuYW1lIjoi0JrQvtC20LXQstC90LjQutC-0LIg0JDRgNGB0LXQvdC40Lkg0JDQvdC00YDQtdC10LLQuNGHIiwiaWF0IjoxNjU0NDI2MDUyLCJleHAiOjE2NTQ0Mjk2NTJ9.oIVgBvSvoagc-AhT73D1uIf7HC7_fVpAl4sLglN5CU4'
    localStorage.setItem('jwt', jwt)
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