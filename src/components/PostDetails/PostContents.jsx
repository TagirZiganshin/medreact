import React from "react";
import PostLinks from "./PostLinks";
const PostContents = ({ post }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <div className="mt-20 mb-8 p-12 relative rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500  bg-opacity-80 shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="absolute left-0 right-0 -top-10 opacity-100">
                        <img
                            alt=""
                            height="100px"
                            width="100px"
                            className="rounded-full mx-auto border-4 border-white shadow-lg"
                            src={`/images/posts/${post.image}`}
                        />
                    </div>

                    <h3 className="text-white mt- mb-4 text-3xl font-bold tracking-wide text-center">
                        {post.user.name}
                    </h3>

                    <p className="text-white text-lg font-light leading-relaxed mb-2">
                        <span className="font-semibold">Название:</span>{" "}
                        {post.name}
                    </p>
                    <p className="text-white text-lg font-light leading-relaxed mb-4">
                        <span className="font-semibold">Описание:</span>{" "}
                        {post.description}
                    </p>
                </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
                <div className="lg:mt-20 mb-8 p-12 relative rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 bg-opacity-80 shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
                    <p className="text-white text-lg font-light leading-relaxed mb-4">
                        <span className="font-semibold">
                            Ссылки на лаборатории:
                        </span>
                        <PostLinks links={post.hospitallink} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostContents;
