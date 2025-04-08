import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost.jsx";
import PostLinks from "../components/PostDetails/PostLinks.jsx";
import PostComments from "../components/PostDetails/PostComments.jsx";
import CreatePost from "../components/PostDetails/CreatePost.jsx";
import PostContents from "../components/PostDetails/PostContents.jsx";
import CircleLoader from "react-spinners/CircleLoader.js";
const PostDetail = () => {
    const { id } = useParams();
    const { loading, post } = usePost(id, "post");
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (post) {
            setComments(post.comment || []);
        }
    }, [post]);
    const handleCommentCreated = (newComment) => {
        console.log(newComment);
        setComments((prevComments) => [...prevComments, newComment]);
    };
    return (
        <div>
            {loading ? (
                <CircleLoader
                    color="white"
                    size={150}
                    className="mx-auto my-20"
                />
            ) : (
                post && (
                    <div key={post.id} className="container mx-auto px-10 mb-8">
                        <PostContents post={post} />
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="col-span-1 lg:col-span-8">
                                <CreatePost
                                    id={id}
                                    onCommentCreated={handleCommentCreated}
                                />
                            </div>
                            <div className="col-span-1 lg:col-span-4">
                                <PostComments comments={comments} />
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default PostDetail;
