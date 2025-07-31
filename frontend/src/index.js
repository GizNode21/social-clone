import React from "react";
//const css = require("./index.css");

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

import configureStore from "./store/index.js";
import { restoreCSRF, csrfFetch } from "./store/csrf.js";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    try {
        restoreCSRF();
        window.csrfFetch = csrfFetch;
        window.store = store;
    } catch (err) {
        console.log(err, "window is undefined");
    }
}

function Root () {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Root /></React.StrictMode>);