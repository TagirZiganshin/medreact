import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../axiosClient.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext.jsx";
import CircleLoader from "react-spinners/CircleLoader";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkeletonPostWidget from "../Skeletons/SkeletonPostWidget.jsx";

gsap.registerPlugin(ScrollTrigger);

const PostWidget = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const { role } = useStateContext();
  const cardRef = useRef(null);
  const newsRefs = useRef([]);
  const isAnimated = useRef(false);

  useEffect(() => {
    axiosClient
      .get("/news")
      .then(({ data }) => {
        setNews(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    if (!loading && news.length > 0 && !isAnimated.current) {
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
            start: "top 97%",
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
              start: "top 97%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, [loading, news]);

  return (
    <div>
      {loading ? (
        <SkeletonPostWidget />
      ) : (
        <>
          <div
            className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8"
            ref={cardRef}
          >
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
              {news ? "Новости" : "Нет Новостей"}
            </h3>
            {news.map((post, index) => (
              <div
                key={post.id}
                ref={(el) => (newsRefs.current[index] = el)}
                className="flex items-center w-full mb-4 max-[30rem]:flex-col"
              >
                <div className="w-16 flex-none">
                  <img
                    alt=""
                    height="60px"
                    width="60px"
                    className="align-middle rounded-full"
                    src={`/images/news/${post.image}`}
                  />
                </div>
                <div className="flex-grow ml-4 max-[30rem]:text-center max-[30rem]:ml-0">
                  <p className="text-gray-500 font-xs">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                      locale: ru,
                    })}
                  </p>
                  <Link to={`/new/${post.id}`} className="text-md ">
                    {post.text}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostWidget;
