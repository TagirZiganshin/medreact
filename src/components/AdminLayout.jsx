import React from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import Logout from "./sessions/Logout.jsx";
import { useStateContext } from "../context/StateContext.jsx";
const AdminLayout = () => {
    const { user, token, role } = useStateContext();
    if (!token) return <Navigate to="/" />;
    if (role.code != "admin") {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
