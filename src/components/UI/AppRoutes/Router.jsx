import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../../../Pages/About";
import Posts from "../../../Pages/Posts";
import Error from "../../../Pages/Error";
import PostIdPage from "../../../Pages/PostIdPage";
import {privateRoutes,publicRoutes} from "./Routes";
import {authContext} from "../../../Context";
import Loader from "../Loader/Loader";

const Router = () => {
    const {isAuth, isLoading} = useContext(authContext)
    if (isLoading) {
        return <Loader/>
    }
    return (
            isAuth
                ?
                <Routes>{
                    privateRoutes.map(route =>
                        <Route
                            element={<route.component/>}
                            path={route.path}
                            key = {route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate replace to="/Posts" />}/>
                    </Routes>
            :
                <Routes>
                    {publicRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                        key = {route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/Login" />} />
                </Routes>
    );
};

export default Router;