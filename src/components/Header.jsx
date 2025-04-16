import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import Logout from "./sessions/Logout";
import BeatLoader from "react-spinners/BeatLoader";
import axiosClient from "../axiosClient";
import { gsap } from "gsap";
import Footer from "../views/Footer";
import Home from "../views/Home";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const { user, token, role, setRole } = useStateContext();
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const burgerIconRef = useRef(null);
  const linksRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (burgerIconRef.current) {
      gsap.to(burgerIconRef.current, {
        rotation: isOpen ? 90 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isOpen]);
  useEffect(() => {
    if (token) {
      axiosClient.get("/check-role").then(({ data }) => {
        setRole(data.RoleData);
      });
    }
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotation: 90 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power4.out",
      }
    );
  }, [token, setRole]);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleHover = (e) => {
    gsap.to(e.target, { scale: 1.1, color: "white", duration: 0.3 });
  };

  const handleHoverOut = (e) => {
    gsap.to(e.target, { scale: 1, color: "white", duration: 0.3 });
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div ref={headerRef} className="container mx-auto px-10 mb-8">
        <div className="border-b w-full border-blue-400 py-8 flex items-center justify-between">
          <div className="md:float-left">
            <Link to="/">
              <span
                ref={logoRef}
                className="cursor-pointer font-bold text-5xl text-white"
              >
                МЕДУС
              </span>
            </Link>
          </div>

          <div ref={menuRef} className="hidden lg:flex lg:justify-end">
            <Link to="/home">
              <span
                ref={(el) => (linksRef.current[0] = el)}
                className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              >
                Главная Страница
              </span>
            </Link>
            <Link to="/chatai">
              <span
                ref={(el) => (linksRef.current[0] = el)}
                className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              >
                Нейросеть
              </span>
            </Link>
            <Link to="/about">
              <span
                ref={(el) => (linksRef.current[1] = el)}
                className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              >
                О нас
              </span>
            </Link>
            {!token && (
              <>
                <Link to="/login">
                  <span
                    ref={(el) => (linksRef.current[2] = el)}
                    className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverOut}
                  >
                    Войти
                  </span>
                </Link>
                <Link to="/register">
                  <span
                    ref={(el) => (linksRef.current[3] = el)}
                    className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverOut}
                  >
                    Зарегистрироваться
                  </span>
                </Link>
              </>
            )}

            {token && (
              <>
                {role.code ? (
                  <>
                    {role.code === "admin" ? (
                      <>
                        <Link to="/admin">
                          <span
                            ref={(el) => (linksRef.current[4] = el)}
                            className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                          >
                            Панель Администратора
                          </span>
                        </Link>
                        <Link to="/posts">
                          <span
                            ref={(el) => (linksRef.current[5] = el)}
                            className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                          >
                            <Logout />
                          </span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/user">
                          <span
                            ref={(el) => (linksRef.current[6] = el)}
                            className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                          >
                            Профиль
                          </span>
                        </Link>
                        <Link to="/posts">
                          <span
                            ref={(el) => (linksRef.current[7] = el)}
                            className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                          >
                            <Logout />
                          </span>
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <span className="block mt-2 align-middle text-white ml-6 font-semibold cursor-pointer">
                    <BeatLoader color="white" size={10} className="mx-auto" />
                  </span>
                )}
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                ref={burgerIconRef}
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div ref={mobileMenuRef} className="lg:hidden py-4">
            <div className="flex flex-col items-start space-y-4">
              <Link to="/home">
                <span
                  className="text-white font-semibold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Главная Страница
                </span>
              </Link>
              <Link to="/chatai">
                <span
                  className="text-white font-semibold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Нейросеть
                </span>
              </Link>
              <Link to="/about">
                <span
                  className="text-white font-semibold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  О нас
                </span>
              </Link>
              {!token && (
                <>
                  <Link to="/login">
                    <span
                      className="text-white font-semibold cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Войти
                    </span>
                  </Link>
                  <Link to="/register">
                    <span
                      className="text-white font-semibold cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Зарегистрироваться
                    </span>
                  </Link>
                </>
              )}
              {token && (
                <>
                  {role.code ? (
                    <>
                      {role.code === "admin" ? (
                        <>
                          <Link to="/admin">
                            <span
                              className="text-white font-semibold cursor-pointer"
                              onClick={() => setIsOpen(false)}
                            >
                              Панель Администратора
                            </span>
                          </Link>
                          <Link to="/posts">
                            <span
                              className="text-white font-semibold cursor-pointer"
                              onClick={() => setIsOpen(false)}
                            >
                              <Logout />
                            </span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/user">
                            <span
                              className="text-white font-semibold cursor-pointer"
                              onClick={() => setIsOpen(false)}
                            >
                              Профиль
                            </span>
                          </Link>
                          <Link to="/posts">
                            <span
                              className="text-white font-semibold cursor-pointer"
                              onClick={() => setIsOpen(false)}
                            >
                              <Logout />
                            </span>
                          </Link>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-white font-semibold cursor-pointer">
                      <BeatLoader color="white" size={10} className="mx-auto" />
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Outlet />
      {location.pathname === "/" && <Home />}

      <Footer />
    </div>
  );
};

export default Header;
