import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {authContext} from "../../../Context";

const NavigationBar = () => {
    const Exit = event => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    const {isAuth, setIsAuth} = useContext(authContext)
    return (
        <div className='navigationBar'>
            <MyButton onClick={Exit}>
                Log out
            </MyButton>
            <div className='navigationBar_links'>
                <Link to="/About">About website</Link>
                <Link to="/Posts">Posts</Link>
            </div>
        </div>
    );
};

export default NavigationBar;