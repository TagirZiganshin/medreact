import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedNewCards = ({ post }) => {
    const cardRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            cardRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        );

        tl.fromTo(
            bgRef.current,
            { scale: 1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.6"
        );

        tl.fromTo(
            contentRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.8,
            },
            "-=0.4"
        );

        tl.fromTo(
            imageRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.8"
        );
    }, []);

    return (
        <div ref={cardRef}>
            <div className="relative h-72 transform transition duration-300 hover:scale-105">
                <div
                    ref={bgRef}
                    className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
                    style={{
                        backgroundImage: `url('/images/news/${post.image}')`,
                    }}
                />
                <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
                <div
                    ref={contentRef}
                    className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full"
                >
                    <p className="text-white mb-4 text-shadow font-semibold text-xs">
                        {formatDistanceToNow(new Date(post.created_at), {
                            addSuffix: true,
                            locale: ru,
                        })}
                    </p>
                    <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
                        {post.text}
                    </p>
                    <div className="flex items-center absolute bottom-5 w-full justify-center">
                        <img
                            ref={imageRef}
                            alt=""
                            height="30px"
                            width="30px"
                            className="align-middle drop-shadow-lg rounded-full"
                            src={`/images/news/${post.image}`}
                        />
                        <p className="inline align-middle text-white text-shadow ml-2 font-medium">
                            {post.name}
                        </p>
                    </div>
                </div>
                <Link to={`/new/${post.id}`}>
                    <span className="cursor-pointer absolute w-full h-full" />
                </Link>
            </div>
        </div>
    );
};

export default FeaturedNewCards;
