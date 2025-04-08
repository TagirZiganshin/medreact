import React from "react";
import { Link } from "react-router-dom";

const PostLinks = ({ links }) => {
    if (links.length === 0) {
        return <p>Нет ссылок на лаборатории</p>;
    }
    return (
        <>
            {links.map((link) => (
                <div key={link.id} className="flex gap-3 mt-2 flex-wrap">
                    <h4>{link.name}:</h4>
                    <Link
                        to={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.link}
                    </Link>
                </div>
            ))}
        </>
    );
};

export default PostLinks;
