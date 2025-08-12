import React, { useState } from "react";
import * as sessionActions from "../../store/session.js";
import { useDispatch, useSelector } from "react-redux";
import {Route, Routes, Navigate } from "react-router-dom";
import "./LoginForm.css"
function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    if (sessionUser) return (
        <Routes>
        <Route element={<Navigate to="/" />}>
        </Route>
        </Routes>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors); 
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((_error, idx) => <li key={idx}>{_error}</li>)}
            </ul>
            <div>
                <label>
                    Username or Email
                    <input 
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
            </label>
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
        </form>
    )
}

export default LoginFormPage;