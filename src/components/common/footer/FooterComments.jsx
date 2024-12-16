import React, { useState, useEffect } from 'react';

const FooterComments = () => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('https://dummyjson.com/comments');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setComments(data.comments.slice(0, 4));
            } catch (err) {
                setError('Error fetching comments: ' + err.message);
            }
        };

        fetchComments();
    }, []);

    return (
        <div className="footer_comments">
            <h3 className="main_heading">Latest Comments</h3>
            {error ? (
                <p className="error_message">{error}</p>
            ) : (
                <ul className="footer_comment_list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="footer_comment_item">
                            <h5 className="footer_comment_name">{comment.user.username}</h5>
                            <p className="footer_comment_body">{comment.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FooterComments;