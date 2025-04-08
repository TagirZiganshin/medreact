import React, { useState } from "react";
import { useStateContext } from "../../context/StateContext.jsx";
import axiosClient from "../../axiosClient.js";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader.js";

const Logout = () => {
    const { setUser, setToken, setRole } = useStateContext();
    const [loading, setLoading] = useState(false);
    const handleLogout = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axiosClient
            .get("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
                setRole(null);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(true);
                console.error("Logout error:", error);
            });
    };

    return (
        <button to="#" onClick={handleLogout}>
            {loading ? (
                <div>
                    <BeatLoader color="white" size={10} className="mx-auto" />
                </div>
            ) : (
                "Выйти"
            )}
        </button>
    );
};

export default Logout;
