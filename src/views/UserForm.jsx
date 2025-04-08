import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient.js";
import { useStateContext } from "../context/StateContext.jsx";
import { gsap } from "gsap";
import { CircleLoader } from "react-spinners";

const UserForm = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const { role } = useStateContext();
    const [display, setDisplay] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке данных пользователя:", err);
                setLoading(false);
                setErrorMessage("Не удалось загрузить данные пользователя.");
            });
    }, []);

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setLoading(true);
        setErrorMessage(null);

        axiosClient
            .put(`/update/${user.id}`, payload)
            .then(({ data }) => {
                if (data.user) {
                    setUser(data.user);
                    setDisplay(false);
                }
                setLoading(false);
            })
            .catch((err) => {
                const response = err.response;
                setLoading(false);
                if (response) {
                    if (response.status === 422) {
                        setErrorMessage(
                            "Некорректные данные. Пожалуйста, проверьте введенные данные."
                        );
                    } else {
                        setErrorMessage("Произошла ошибка на сервере.");
                    }
                } else {
                    setErrorMessage("Ошибка сети или сервер не отвечает.");
                }
            });
    };

    const handleToggleForm = () => {
        setDisplay((prevDisplay) => !prevDisplay);
        if (!display) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: -50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
            gsap.fromTo(
                buttonRef.current,
                { scale: 1 },
                { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 }
            );
        } else {
            gsap.to(formRef.current, {
                opacity: 0,
                y: -50,
                scale: 0.9,
                duration: 0.5,
                ease: "power2.in",
            });
        }
    };

    useEffect(() => {
        if (display) {
            gsap.fromTo(
                formRef.current.querySelectorAll("input, button"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
            );
        }
    }, [display]);

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-r ">
            {loading ? (
                <CircleLoader
                    color="white"
                    size={150}
                    className="mx-auto my-20"
                />
            ) : (
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {user.name}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{role.name}</p>
                    </div>
                    {display && (
                        <form
                            ref={formRef}
                            className="space-y-4"
                            onSubmit={Submit}
                        >
                            <input
                                name="name"
                                type="text"
                                placeholder="Новое имя"
                                defaultValue={user.name}
                                ref={nameRef}
                                className="block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Новый email"
                                defaultValue={user.email}
                                ref={emailRef}
                                className="block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Новый пароль"
                                ref={passwordRef}
                                className="block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                            >
                                Изменить данные
                            </button>
                        </form>
                    )}
                    <button
                        ref={buttonRef}
                        onClick={handleToggleForm}
                        className="mt-6 w-full bg-gray-300 py-3 rounded-lg hover:bg-gray-400 transition-all duration-200 transform hover:scale-105"
                    >
                        {display ? "Скрыть форму" : "Изменить данные"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserForm;
