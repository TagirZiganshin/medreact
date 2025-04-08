import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
const usePost = (id, name) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState([]);
    useEffect(() => {
        axiosClient
            .get(`/${name}/${id}`)
            .then(({ data }) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Message error", err);
                setLoading(true);
            });
    }, [id]);

    return { loading, post };
};

export default usePost;
