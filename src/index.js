import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {isDisabled} from "@testing-library/user-event/dist/utils";
import app from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);