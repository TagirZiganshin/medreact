import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";

const SkeletonCard = () => {
  const infoRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const cardRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    if (
      !cardRef.current ||
      !imgRef.current ||
      !infoRef.current ||
      !titleRef.current ||
      !descriptionRef.current
    )
      return;

    gsap.set(cardRef.current, { perspective: 800 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    tl.fromTo(
      cardRef.current,
      { opacity: 0, rotateX: -20, rotateY: -180, scale: 0.8 },
      { opacity: 1, rotateX: 0, rotateY: 0, scale: 1, duration: 1.5 }
    );

    tl.fromTo(
      [
        imgRef.current,
        infoRef.current,
        titleRef.current,
        descriptionRef.current,
      ],
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
      },
      "-=0.5"
    );
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 animate-pulse"
      ref={cardRef}
    >
      <div
        className="relative shadow-md pb-70 max-[380px]:pb-40 md:pb-80 mb-6"
        ref={imgRef}
      >
        <div className="absolute h-70 max-[380px]:h-40 md:h-80 w-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-t-lg lg:rounded-lg"></div>
      </div>

      <div
        className="h-8 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-3/4 mx-auto mb-8"
        ref={titleRef}
      ></div>

      <div className="flex justify-center space-x-8 mb-8" ref={infoRef}>
        <div className="h-6 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-1/4"></div>
        <div className="h-6 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-1/4"></div>
      </div>

      <div className="px-4 lg:px-20 mb-8 space-y-2" ref={descriptionRef}>
        <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-full"></div>
        <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-5/6"></div>
        <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-4/6"></div>
      </div>

      <div className="h-12 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full w-1/3 mx-auto"></div>
    </div>
  );
};

export default SkeletonCard;
