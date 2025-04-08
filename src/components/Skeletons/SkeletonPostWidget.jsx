import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SkeletonPostWidget = () => {
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const newsRefs = useRef([]);

    useEffect(() => {
        // Настройка начальных свойств
        gsap.set(cardRef.current, { perspective: 800 });

        // Анимация для контейнера
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 },
        });

        tl.fromTo(
            cardRef.current,
            { opacity: 0, rotateX: -20, rotateY: -180, scale: 0.8 },
            { opacity: 1, rotateX: 0, rotateY: 0, scale: 1, duration: 1.5 }
        );
        // Анимация для заголовка
        tl.fromTo(
            titleRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8 },
            "-=0.5"
        );

        // Анимация для каждой новости
        newsRefs.current.forEach((item, index) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: "power2.out",
                },
                "-=1"
            );
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-8 pb-12 mb-8 animate-pulse"
        >
            {/* Скелетон для заголовка */}
            <div
                ref={titleRef}
                className="text-xl mb-8 font-semibold border-b pb-4"
            >
                <div className="h-6 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-1/2"></div>
            </div>

            {/* Скелетон для списка новостей */}
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    ref={(el) => (newsRefs.current[index] = el)}
                    className="flex items-center w-full mb-4"
                >
                    {/* Скелетон для изображения */}
                    <div className="w-16 flex-none">
                        <div className="h-16 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"></div>
                    </div>

                    {/* Скелетон для текста */}
                    <div className="flex-grow ml-4">
                        <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonPostWidget;
