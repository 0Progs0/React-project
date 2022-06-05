import React, {useEffect, useMemo, useRef, useState} from 'react'
import './Styles/App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import About from "./Pages/About";
import Posts from "./Pages/Posts";
import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
import Error from "./Pages/Error";
import Router from "./components/UI/AppRoutes/Router";
import {authContext} from "./Context";


function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('auth'))
            setIsAuth(true)
            setIsLoading(false)
    },[])
    return (
        <authContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <NavigationBar/>
                <Router/>
            </BrowserRouter>
        </authContext.Provider>
    )
}

export default App;
