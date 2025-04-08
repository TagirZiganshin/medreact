import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/StateContext.jsx";
const AuthLayout = () => {
    const { user, token, role } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
