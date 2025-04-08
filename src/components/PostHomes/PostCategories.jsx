import React, { useEffect, useState, useRef } from "react";

import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/StateContext";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const PostCategories = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { role } = useStateContext();
  const cardRef = useRef(null);
  const newsRefs = useRef([]);
  const isAnimated = useRef(false);
  useEffect(() => {
    axiosClient
      .get("/posts")
      .then(({ data }) => {
        setPosts(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(true);
      });
  }, []);
  useEffect(() => {
    if (!loading && posts.length > 0 && !isAnimated.current) {
      isAnimated.current = true;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.8, rotationY: 90 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      newsRefs.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [loading, posts]);
  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <>
          <div
            className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8"
            ref={cardRef}
          >
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
              Медицинские услуги
            </h3>
            {posts.map((post, index) => (
              <Link
                key={index}
                to={`/post/${post.id}`}
                ref={(el) => (newsRefs.current[index] = el)}
              >
                <span
                  className={`cursor-pointer block ${
                    index === post.length - 1 ? "border-b-0" : "border-b"
                  } pb-3 mb-3`}
                >
                  {post.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCategories;
