import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const About = () => {
  const containerRef = useRef();
  const textRefs = useRef([]);
  const buttonRef = useRef();

  useEffect(() => {
    gsap.set(containerRef.current, { perspective: 800 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, rotateX: -20, rotateY: -180, scale: 0.8 },
      { opacity: 1, rotateX: 0, rotateY: 0, scale: 1, duration: 2 }
    );
    tl.fromTo(
      textRefs.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
      "-=0.5"
    );
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 sm:p-12 lg:p-16 transform transition-all">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          О компании
        </h2>
        <div className="space-y-6 text-gray-700">
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="text-lg leading-relaxed"
          >
            <span className="font-semibold text-blue-600">Prisma</span> — это
            ведущий медицинский информационный портал в России, созданный в 2025
            году. Мы предоставляем доступ к самой актуальной и достоверной
            информации о здоровье, диагностике и лечении.
          </p>
          <p
            ref={(el) => (textRefs.current[1] = el)}
            className="text-lg leading-relaxed"
          >
            Наша миссия — сделать медицинские знания доступными для каждого. Мы
            объединяем экспертов в области медицины, чтобы предоставить вам
            проверенные данные, которые помогут принимать обоснованные решения о
            вашем здоровье.
          </p>
          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="text-lg leading-relaxed"
          >
            <span className="font-semibold text-purple-600">Prisma</span> — это
            не просто портал, это сообщество, где пациенты и врачи могут
            обмениваться опытом, задавать вопросы и находить ответы. Мы
            стремимся к тому, чтобы каждый человек мог получить качественную
            медицинскую помощь и информацию.
          </p>
          <p
            ref={(el) => (textRefs.current[3] = el)}
            className="text-lg leading-relaxed"
          >
            Мы гордимся тем, что внедряем передовые технологии и мировые
            стандарты качества. Наш портал соответствует лучшим международным
            практикам, что делает его надежным источником информации для
            миллионов людей.
          </p>
        </div>
        <div className="mt-10 text-center">
          <Link
            ref={buttonRef}
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-110 hover:rotate-1"
          >
            Узнать больше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
