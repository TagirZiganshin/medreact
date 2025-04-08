import React, { useState } from "react";
import axiosClient from "../axiosClient";

const useCreateNew = (url) => {
    const [newsloading, setNewsLoading] = useState(false);
    const newSubmitForm = (formData) => {
        setNewsLoading(true);
        axiosClient
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                setNewsLoading(false);
            })
            .catch((err) => {
                console.error("Message error", err);
                setNewsLoading(false);
            });
    };
    return { newsloading, newSubmitForm };
};

export default useCreateNew;
