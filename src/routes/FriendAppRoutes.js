import React from 'react'
import { Routes as MyAppRoutes, Route, Link } from "react-router-dom";
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
const FriendAppRoutes = () => {
    return (
        <div>
        <MyAppRoutes>
        <Route path="/" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/home" element={<HomePage/>} />
       </MyAppRoutes>  
        </div>
    )
}

export default FriendAppRoutes
