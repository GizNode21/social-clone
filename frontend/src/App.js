import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {Routes, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/index.js";
import * as sessionActions from "./store/session.js";
function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    }, [dispatch]);
    return isLoaded && (
    <Routes>
        <Route path="/login/*" element={<LoginFormPage />}>
        </Route>
    </Routes>
    )
}

export default App;