import React, { useRef } from "react";
import useCreateNew from "../../hooks/useCreateNew";
import BeatLoader from "react-spinners/BeatLoader";
const CreateNew = () => {
    const nameNewsRef = useRef();
    const textNewsRef = useRef();
    const descriptionNewsRef = useRef();
    const imageNewsRef = useRef();
    const { newsloading, newSubmitForm } = useCreateNew("/create-news");
    const newsSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("name", nameNewsRef.current.value);
        formData.append("description", descriptionNewsRef.current.value);
        formData.append("text", textNewsRef.current.value);
        formData.append("image", imageNewsRef.current.files[0]);
        newSubmitForm(formData);
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">
                Публикация новости
            </h1>
            <form action="#" onSubmit={newsSubmit} method="POST">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        ref={nameNewsRef}
                        placeholder="Кто создал"
                        className="p-4 outline-none w-full rounded-lg h-10 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        name="text"
                        ref={textNewsRef}
                        placeholder="Заголовок"
                        className="p-4 outline-none w-full rounded-lg h-10 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <textarea
                        type="text"
                        name="description"
                        ref={descriptionNewsRef}
                        placeholder="Описание"
                        className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="file"
                        name="image"
                        ref={imageNewsRef}
                        className="p-4 outline-none w-full rounded-lg h-14 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="mt-8">
                    <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                        {newsloading ? (
                            <div>
                                <BeatLoader
                                    color="white"
                                    size={10}
                                    className="mx-auto"
                                />
                            </div>
                        ) : (
                            "опубликовать"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNew;
