import React, { useEffect } from "react";
import { useStateContext } from "../context/StateContext.jsx";
import { Outlet, Link, Navigate } from "react-router-dom";
import axiosClient from "../axiosClient.js";
import Logout from "./sessions/Logout.jsx";

const UserLayout = () => {
    const { user, token, role, setRole } = useStateContext();

    useEffect(() => {
        if (token) {
            axiosClient.get("/check-role").then(({ data }) => {
                setRole(data.RoleData);
            });
        }
    }, [token, setRole]);

    if (token) {
        if (role.code === "admin") {
            return <Navigate to="/admin" />;
        }
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default UserLayout;
