import React, { useState } from "react";
import axiosClient from "../axiosClient";

const useCreatePost = (url) => {
    const [loading, setLoading] = useState(false);
    const submitForm = (formData) => {
        setLoading(true);
        axiosClient
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                setLoading(false);
            })
            .catch((err) => {
                console.error("Message error", err);
                setLoading(false);
            });
    };
    return { loading, submitForm };
};

export default useCreatePost;
