import React, { useRef } from "react";
import useCreatePost from "../../hooks/useCreatePost";
import BeatLoader from "react-spinners/BeatLoader";
const CreatePost = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const { loading, submitForm } = useCreatePost("/create-post");
    const Submit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("image", imageRef.current.files[0]);
        submitForm(formData);
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Публикация поста
            </h3>
            <form action="#" onSubmit={Submit} method="POST">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Заголовок"
                        ref={nameRef}
                        className="p-4 outline-none w-full rounded-lg h-10 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <textarea
                        type="text"
                        name="description"
                        ref={descriptionRef}
                        placeholder="Описание"
                        className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="file"
                        name="image"
                        ref={imageRef}
                        className="p-4 outline-none w-full rounded-lg h-14 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    />
                </div>
                <div className="mt-8">
                    <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                        {loading ? (
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

export default CreatePost;
