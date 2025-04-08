import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostCards = ({ post }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8, rotationY: 90 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: -50, scale: 1.2 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(
      infoRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8"
    >
      <div className="relative shadow-md pb-70 max-[380px]:pb-40 md:pb-80 mb-6">
        <img
          ref={imageRef}
          src={`/images/posts/${post.image}`}
          alt=""
          className="object-center absolute h-70 max-[380px]:h-40 md:h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1
        ref={titleRef}
        className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold"
      >
        <Link to={`/post/${post.id}`}>{post.name}</Link>
      </h1>
      <div
        ref={infoRef}
        className="block lg:flex text-center items-center justify-center mb-8 w-full"
      >
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.user.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
              locale: ru,
            })}
          </span>
        </div>
      </div>
      <p
        ref={descRef}
        className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8"
      >
        {post.description}
      </p>
      <div className="text-center">
        <Link to={`/post/${post.id}`}>
          <span
            ref={buttonRef}
            className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Подробно
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCards;
