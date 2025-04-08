import React, { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import BeatLoader from "react-spinners/BeatLoader";

const CreatePost = ({ id, onCommentCreated }) => {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const Sumbit = (ev) => {
        ev.preventDefault();
        const payload = {
            description: description,
        };
        setLoading(true);
        setError("");
        axiosClient
            .post(`/create-comment/${id}`, payload)
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                onCommentCreated(data.comment);
            })
            .catch((err) => {
                console.error("Message error", err);
                setError(err.response.data.error);
                setLoading(false);
            });
    };
    return (
        <>
            <form onSubmit={Sumbit}>
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        Создать Комментарий
                    </h3>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <textarea
                            className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                            type="text"
                            placeholder="Comment"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="text-xs text-red-500">{error}</div>
                    )}
                    <div className="mt-8">
                        <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                            {loading ? (
                                <div>
                                    <BeatLoader
                                        color="white"
                                        size={10}
                                        className="mx-auto"
                                    />
                                </div>
                            ) : (
                                " Post Comment"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreatePost;
