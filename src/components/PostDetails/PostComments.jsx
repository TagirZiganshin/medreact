import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { motion } from "framer-motion";
import { useState } from "react";
const PostComments = ({ comments }) => {
    const [visibleComments, setVisibleComments] = useState(10);
    if (!Array.isArray(comments) || comments.length === 0) {
        return <p>Нет комментариев</p>;
    }
    const sortedComments = comments.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    const loadMoreComments = () => {
        setVisibleComments((prevVisibleComments) => prevVisibleComments + 10);
    };
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                    {sortedComments.length}
                    <span className="mt-3"> Комментарии</span>
                </h3>

                {sortedComments.slice(0, visibleComments).map((com) => (
                    <motion.div
                        key={com.id}
                        className="border-b border-gray-100 mb-4 pb-4"
                        initial={{ opacity: 0, y: 0, x: -120 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        {com.author.role &&
                        com.author.role.code === "doctor" ? (
                            <div className="flex gap-1">
                                {com.author?.name}
                                <p className="text-blue-600">(Врач)</p>
                            </div>
                        ) : com.author.role &&
                          com.author.role.code === "user" ? (
                            <p>{com.author?.name} (Пользователь)</p>
                        ) : (
                            <p>{com.author?.name}</p>
                        )}
                        <p className="whitespace-pre-line text-gray-600 w-full">
                            {com.description}
                        </p>
                        {com.created_at && (
                            <p>
                                {formatDistanceToNow(new Date(com.created_at), {
                                    addSuffix: true,
                                    locale: ru,
                                })}
                            </p>
                        )}
                    </motion.div>
                ))}
                {visibleComments < sortedComments.length && (
                    <button
                        onClick={loadMoreComments}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Показать еще
                    </button>
                )}
            </div>
        </>
    );
};

export default PostComments;
