import React, { useEffect } from "react";
import Posts from "./Posts.jsx";
import PostWidget from "../components/PostHomes/PostWidget.jsx";
import PostCategories from "../components/PostHomes/PostCategories.jsx";
import FeaturedNews from "../components/PostHomes/FeaturedNews.jsx";
import { useStateContext } from "../context/StateContext.jsx";
import { Navigate } from "react-router-dom";
import axiosClient from "../axiosClient.js";
const Home = () => {
    const { token, role, setRole } = useStateContext();
    useEffect(() => {
        if (token) {
            axiosClient.get("/check-role").then(({ data }) => {
                setRole(data.RoleData);
            });
        }
    }, [token, setRole]);
    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <FeaturedNews />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 col-span-1">
                        <Posts />
                    </div>
                    <div className="lg:col-span-4 col-span-1">
                        <div className="lg:sticky relative top-8">
                            <PostWidget />
                            <PostCategories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
