import React, { useRef, useState } from "react";
import axiosClient from "../axiosClient";
import BeatLoader from "react-spinners/BeatLoader";
import CreateNew from "../components/Admin/CreateNew";
import CreatePost from "../components/Admin/CreatePost";
const Admin = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-6">
                    <CreatePost />
                </div>
                <div className="col-span-1 lg:col-span-6">
                    <CreateNew />
                </div>
            </div>
        </div>
    );
};
export default Admin;
