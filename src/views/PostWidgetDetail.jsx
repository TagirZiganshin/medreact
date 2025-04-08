import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost.jsx";
import CircleLoader from "react-spinners/CircleLoader.js";
const PostWidgetDetail = () => {
    const { id } = useParams();
    const { loading, post } = usePost(id, "new");
    return (
        <>
            {loading ? (
                <CircleLoader
                    color="white"
                    size={150}
                    className="mx-auto my-40"
                />
            ) : (
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-10">
                        <div className="col-span-1 lg:col-span-8">
                            <div className="mt-20 mb-8 p-12 relative rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500  bg-opacity-80 shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
                                <div className="absolute left-0 right-0 -top-15 opacity-100">
                                    <img
                                        alt=""
                                        height="100px"
                                        width="100px"
                                        className="rounded-full mx-auto border-4 border-white shadow-lg"
                                        src={`/images/news/${post.image}`}
                                    />
                                </div>

                                <h3 className="text-white my-3 mb-4 text-3xl font-bold tracking-wide text-center">
                                    {post.text}
                                </h3>

                                <p className="text-white text-lg font-light leading-relaxed mb-2">
                                    <span className="font-semibold">
                                        Название:
                                    </span>
                                    {post.name}
                                </p>
                                <p className="text-white text-lg font-light leading-relaxed mb-4">
                                    <span className="font-semibold">
                                        Описание:
                                    </span>
                                    {post.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostWidgetDetail;
