import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../axiosClient.js";
import { useStateContext } from "../../context/StateContext.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeaturedNewCards from "./FeaturedNewCards.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const FeaturedNews = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const { role } = useStateContext();
  const sliderContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const addSlideRef = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };

  useEffect(() => {
    axiosClient
      .get("/news")
      .then(({ data }) => {
        setNews(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    if (!loading && sliderContainerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sliderContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(
        sliderContainerRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
      if (slidesRef.current.length) {
        tl.fromTo(
          slidesRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.3,
          },
          "-=0.5"
        );
      }
    }
  }, [loading]);

  const animateArrow = (direction) => {
    const selector =
      direction === "left" ? ".arrow-btn.left-arrow" : ".arrow-btn.right-arrow";
    gsap.fromTo(
      selector,
      { scale: 1.2 },
      { scale: 1, duration: 0.3, ease: "power1.out" }
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
      <button
        onClick={() => {
          onClick();
          animateArrow("left");
        }}
        className="absolute arrow-btn left-arrow left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
    );
  };

  const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
      <button
        onClick={() => {
          onClick();
          animateArrow("right");
        }}
        className="absolute arrow-btn right-arrow right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    );
  };

  if (loading) return <div></div>;

  return (
    <div ref={sliderContainerRef} className="mb-8 relative">
      <Carousel
        infinite
        rtl={false}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        itemClass="px-4"
      >
        {news.map((post) => (
          <div key={post.id} ref={addSlideRef}>
            <FeaturedNewCards post={post} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedNews;
