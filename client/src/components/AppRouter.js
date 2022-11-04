import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {adminRoutes, editorRoutes, publicRoutes, readerRoutes} from "../routes";
import {START_ROUTE} from "../utils/consts";
import jwt_decode from "jwt-decode";

const AppRouter = () => {
    const token = localStorage.getItem("jwt")
    const userRole = token === null ? 'Unauthorized' : jwt_decode(token).role

    const adminAccess = userRole === 'Администратор'
    const readerAccess = userRole === 'Читатель'
    const editorAccess = userRole === 'Администратор' || userRole === 'Редактор'
    return (
        <Routes>
            {(readerAccess || editorAccess || adminAccess) && readerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {adminAccess && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {editorAccess && editorRoutes.map(({path, Component}) =>
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