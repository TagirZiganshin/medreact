import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/StateContext.jsx";
import PostCards from "../components/PostHomes/PostCards.jsx";
import SkeletonCard from "../components/Skeletons/SkeletonCard.jsx";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { role } = useStateContext();

  useEffect(() => {
    axiosClient
      .get("/posts")
      .then(({ data }) => {
        setPosts(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(true);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCards post={post} key={post.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
