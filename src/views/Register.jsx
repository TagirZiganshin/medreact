import React, { useRef, useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext.jsx";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import BeatLoader from "react-spinners/BeatLoader.js";
const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const { setUser, setToken, setRole } = useStateContext();
    useEffect(() => {
        gsap.set(formRef.current, { perspective: 800 });
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 },
        });
        tl.fromTo(
            formRef.current,
            { opacity: 0, rotateX: -20, rotateY: -180, scale: 0.8 },
            { opacity: 1, rotateX: 0, rotateY: 0, scale: 1, duration: 1.5 }
        );

        tl.fromTo(
            [nameRef.current, emailRef.current, passwordRef.current],
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
            "-=0.5"
        );
        tl.fromTo(
            formRef.current.querySelector("button[type='submit']"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8 },
            "-=0.5"
        );
    }, []);

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setLoading(true);
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setRole(data.role);
                setLoading(false);
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 422) {
                        console.log(response.data.errors);
                    } else {
                        console.log(
                            "Sever error",
                            response.status,
                            response.data
                        );
                    }
                } else {
                    console.log("ошибка сети или серевер не отвечает");
                }
            });
    };
    return (
        <div className="min-h-screen flex items-start justify-center px-6 py-12 lg:px-8">
            <div
                className="w-full max-w-sm space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
                ref={formRef}
            >
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Зарегистрируйте свою учетную запись
                    </h2>
                </div>

                <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={Submit}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ваш ФИО
                            </label>
                            <div className="mt-1">
                                <input
                                    ref={nameRef}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                                    placeholder="Введите свое ФИО"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ваша почта
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    ref={emailRef}
                                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                                    placeholder="Введите свою почту"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ваш пароль
                            </label>
                            <div className="mt-1 flex justify-between">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                                    placeholder="Введите свой пароль"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            {loading ? (
                                <div>
                                    <BeatLoader
                                        color="white"
                                        size={10}
                                        className="mx-auto"
                                    />
                                </div>
                            ) : (
                                "Зарегистрироваться"
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    У вас есть учетная запись?
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
