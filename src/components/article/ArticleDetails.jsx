import React, { useEffect, useState } from 'react';
import { fetchData, fetchFromLocalStorage, storeToLocalStorage, toggleBookmark } from '../utils/Utils';
import adImage from "../../assets/images/Advertising.png"
import { NavLink, useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const [post, setPost] = useState(null);
    const [filledItems, setFilledItems] = useState({});
    const [topPosts, setTopPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing((prevState) => !prevState);
    };

    const { key, id } = useParams();

    useEffect(() => {
        const storedPosts = fetchFromLocalStorage(key);
        if (storedPosts && storedPosts.length > 0) {
            const getPost = storedPosts.filter((post) => post.id === id)
            setPost(getPost[0])

            const limitedPosts = storedPosts.slice(0, 6);
            setTopPosts(limitedPosts);
        } else {
            console.error("No posts found in local storage.");
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        const loadComments = async () => {
            const data = await fetchData('https://dummyjson.com/comments');
            if (data && data.comments) {
                setComments(data.comments.slice(0, 2));
            } else {
                console.error("Failed to fetch comments.");
            }
            setIsLoadingComments(false);
        };

        loadComments();
    }, []);

    const postTags = ['Montenegro', 'Visit Croatia', 'Luxury Travel', 'Travel Log', 'Paradise Island', 'Travel Info']

    if (!post) {
        storeToLocalStorage()
        return <p>Loading article details...</p>;
    }

    return (
        <div className="article_details_wrap">
            <div className="ad_content">
                <div className="ad_header">
                    <h3 className="ad_heading" title={post.title}>{post.title}</h3>
                    <div className={`post_slide_img ad_img ${post.image === 'https://via.placeholder.com/150' ? 'loading' : ''}`}>
                        <img src={post.image || 'https://via.placeholder.com/150'} alt={post.title || 'No Title'} />

                        <div className="ad_sub_header">
                            <div className="ad_category">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 17 16" fill="none">
                                    <path d="M13.7227 3.375C14.707 3.375 15.4727 4.16797 15.4727 5.125V12.125C15.4727 13.1094 14.6797 13.875 13.7227 13.875H3.22266C2.23828 13.875 1.47266 13.1094 1.47266 12.125V3.375C1.47266 2.41797 2.23828 1.625 3.22266 1.625H6.44922C6.91406 1.625 7.35156 1.81641 7.67969 2.14453L9.01953 3.375H13.7227ZM14.1602 12.125V5.125C14.1602 4.90625 13.9414 4.6875 13.7227 4.6875H8.47266L6.72266 3.07422C6.64062 2.99219 6.53125 2.9375 6.42188 2.9375H3.22266C2.97656 2.9375 2.78516 3.15625 2.78516 3.375V12.125C2.78516 12.3711 2.97656 12.5625 3.22266 12.5625H13.7227C13.9414 12.5625 14.1602 12.3711 14.1602 12.125Z" fill="#3E3232" fillOpacity="0.5" />
                                </svg>
                                <span>{post.category || 'Sports'}</span>
                            </div>
                            <div className="ad_date">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 17 16" fill="none">
                                    <path d="M6.53125 2.5H10.4688V1.40625C10.4688 1.05078 10.7422 0.75 11.125 0.75C11.4805 0.75 11.7812 1.05078 11.7812 1.40625V2.5H12.875C13.832 2.5 14.625 3.29297 14.625 4.25V13C14.625 13.9844 13.832 14.75 12.875 14.75H4.125C3.14062 14.75 2.375 13.9844 2.375 13V4.25C2.375 3.29297 3.14062 2.5 4.125 2.5H5.21875V1.40625C5.21875 1.05078 5.49219 0.75 5.875 0.75C6.23047 0.75 6.53125 1.05078 6.53125 1.40625V2.5ZM3.6875 13C3.6875 13.2461 3.87891 13.4375 4.125 13.4375H12.875C13.0938 13.4375 13.3125 13.2461 13.3125 13V6H3.6875V13Z" fill="#3E3232" fillOpacity="0.5" />
                                </svg>
                                <span>{post.date || 'Unknown Date'}</span>
                            </div>
                            <div className="ad_comments_count">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 17 16" fill="none">
                                    <path d="M5.4375 6.4375C5.90234 6.4375 6.28516 6.84766 6.28516 7.3125C6.28516 7.80469 5.90234 8.1875 5.4375 8.1875C4.94531 8.1875 4.5625 7.80469 4.5625 7.3125C4.5625 6.84766 4.94531 6.4375 5.4375 6.4375ZM8.5 6.4375C8.96484 6.4375 9.34766 6.84766 9.34766 7.3125C9.34766 7.75 8.9375 8.16016 8.5 8.16016C8.03516 8.16016 7.625 7.77734 7.625 7.3125C7.625 6.82031 8.00781 6.4375 8.5 6.4375ZM11.5625 6.4375C12.0273 6.4375 12.4375 6.84766 12.4102 7.3125C12.4102 7.80469 12.0273 8.1875 11.5625 8.1875C11.0977 8.1875 10.6875 7.80469 10.6875 7.3125C10.6875 6.84766 11.0703 6.4375 11.5625 6.4375ZM8.5 1.625C12.3555 1.625 15.4727 4.22266 15.4727 7.33984C15.4727 10.457 12.3555 13 8.5 13C7.59766 13 6.72266 12.8633 5.95703 12.6172C5.13672 13.1914 3.82422 13.875 2.15625 13.875C1.88281 13.875 1.63672 13.7383 1.55469 13.4648C1.47266 13.2188 1.5 12.9453 1.69141 12.7539C1.69141 12.7539 2.53906 11.8242 2.94922 10.7578C2.04688 9.80078 1.5 8.59766 1.5 7.3125C1.5 4.16797 4.61719 1.625 8.5 1.625ZM8.5 11.6875C11.6172 11.6875 14.1328 9.74609 14.1328 7.3125C14.1328 4.90625 11.5898 2.9375 8.47266 2.9375C5.35547 2.9375 2.8125 4.90625 2.8125 7.3125C2.8125 8.48828 3.38672 9.36328 3.87891 9.88281L4.45312 10.4844L4.15234 11.25C4.01562 11.6328 3.82422 12.0156 3.60547 12.3438C4.26172 12.125 4.80859 11.8242 5.19141 11.5508L5.71094 11.168L6.33984 11.3594C7.02344 11.5781 7.76172 11.6875 8.5 11.6875Z" fill="#3E3232" fillOpacity="0.5" />
                                </svg>
                                <span>35</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ad_body">
                    {post.content || 'No Description Available'}
                    <NavLink to={post.url} target='_blank' className="article_forward_link">Click to read more...</NavLink>
                </div>
            </div>
            <div className="ad_author_wrap">
                <div className="article_button_wrap">
                    <button className="article_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none">
                            <path d="M14.6992 0.886719C14.918 1.02344 15.0273 1.26953 14.9453 1.51562L13.1953 13.3281C13.168 13.5195 13.0586 13.7109 12.8672 13.793C12.7852 13.8477 12.6758 13.9023 12.5664 13.9023C12.457 13.9023 12.375 13.875 12.293 13.8477L9.61328 12.6992L6.57812 14.668C6.46875 14.7227 6.33203 14.75 6.22266 14.75C6.14062 14.75 6.03125 14.7227 5.92188 14.6953C5.70312 14.5586 5.59375 14.3398 5.59375 14.0938V11.0039L1.38281 9.25391C1.16406 9.14453 1 8.92578 1 8.67969C0.972656 8.43359 1.10938 8.1875 1.32812 8.07812L14.0156 0.859375C14.2344 0.722656 14.5078 0.75 14.6992 0.886719ZM11.0898 4.03125L3.13281 8.54297L5.97656 9.74609L11.0898 4.03125ZM6.87891 12.8906L8.13672 12.0977L6.87891 11.5508V12.8906ZM12.0469 12.2891L13.3594 3.45703L7.23438 10.2656L12.0469 12.2891Z" fill="#3E3232" fillOpacity="0.5" />
                        </svg>
                        share
                    </button>
                    <button className="article_button" onClick={() => toggleBookmark(post.id, setFilledItems)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`bookmark-icon ${filledItems[post.id] ? 'filled' : ''}`} viewBox="0 0 20 21">
                            <path d="M15.625 0C16.6406 0 17.5 0.859375 17.5 1.875V18.75C17.5 19.7266 16.4453 20.3125 15.5859 19.8438L10 16.5625L4.375 19.8438C3.51562 20.3125 2.5 19.7266 2.5 18.75V1.875C2.5 0.859375 3.32031 0 4.375 0H15.625Z" />
                        </svg>
                        marking
                    </button>
                    <button className="article_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 17 16" fill="none">
                            <path d="M5.4375 6.4375C5.90234 6.4375 6.28516 6.84766 6.28516 7.3125C6.28516 7.80469 5.90234 8.1875 5.4375 8.1875C4.94531 8.1875 4.5625 7.80469 4.5625 7.3125C4.5625 6.84766 4.94531 6.4375 5.4375 6.4375ZM8.5 6.4375C8.96484 6.4375 9.34766 6.84766 9.34766 7.3125C9.34766 7.75 8.9375 8.16016 8.5 8.16016C8.03516 8.16016 7.625 7.77734 7.625 7.3125C7.625 6.82031 8.00781 6.4375 8.5 6.4375ZM11.5625 6.4375C12.0273 6.4375 12.4375 6.84766 12.4102 7.3125C12.4102 7.80469 12.0273 8.1875 11.5625 8.1875C11.0977 8.1875 10.6875 7.80469 10.6875 7.3125C10.6875 6.84766 11.0703 6.4375 11.5625 6.4375ZM8.5 1.625C12.3555 1.625 15.4727 4.22266 15.4727 7.33984C15.4727 10.457 12.3555 13 8.5 13C7.59766 13 6.72266 12.8633 5.95703 12.6172C5.13672 13.1914 3.82422 13.875 2.15625 13.875C1.88281 13.875 1.63672 13.7383 1.55469 13.4648C1.47266 13.2188 1.5 12.9453 1.69141 12.7539C1.69141 12.7539 2.53906 11.8242 2.94922 10.7578C2.04688 9.80078 1.5 8.59766 1.5 7.3125C1.5 4.16797 4.61719 1.625 8.5 1.625ZM8.5 11.6875C11.6172 11.6875 14.1328 9.74609 14.1328 7.3125C14.1328 4.90625 11.5898 2.9375 8.47266 2.9375C5.35547 2.9375 2.8125 4.90625 2.8125 7.3125C2.8125 8.48828 3.38672 9.36328 3.87891 9.88281L4.45312 10.4844L4.15234 11.25C4.01562 11.6328 3.82422 12.0156 3.60547 12.3438C4.26172 12.125 4.80859 11.8242 5.19141 11.5508L5.71094 11.168L6.33984 11.3594C7.02344 11.5781 7.76172 11.6875 8.5 11.6875Z" fill="#3E3232" fillOpacity="0.5" />
                        </svg>
                        comment
                    </button>
                </div>
                <div className="article_user_wrap">
                    <div className="article_user_img">
                        <img src={post.user?.image || 'https://via.placeholder.com/50'} alt={post.user?.name || 'Anonymous'} />
                    </div>
                    <h5 className="article_user_name" title={post.user?.name || 'Anonymous'}>
                        {post.user?.name || 'Anonymous'}
                    </h5>
                    <p className='article_user_post_count'>
                        {post.user?.postCount || '0'} posts
                    </p>
                    <button className={`article_user_follow_btn ${isFollowing ? 'following' : ''}`} onClick={handleFollowClick} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6875 7.75C13.6875 8.24219 13.2773 8.65234 12.8125 8.65234H8.875V12.5898C8.875 13.0547 8.46484 13.4375 8 13.4375C7.50781 13.4375 7.125 13.0547 7.125 12.5898V8.65234H3.1875C2.69531 8.65234 2.3125 8.24219 2.3125 7.75C2.3125 7.28516 2.69531 6.90234 3.1875 6.90234H7.125V2.96484C7.125 2.47266 7.50781 2.0625 8 2.0625C8.46484 2.0625 8.875 2.47266 8.875 2.96484V6.90234H12.8125C13.2773 6.875 13.6875 7.28516 13.6875 7.75Z" fill="#F81539fb" />
                        </svg>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
                <div className="article_tag_wrap">
                    <h3 className="main_heading">tags</h3>
                    <div className="article_tag_list">
                        {postTags.map((tag, index) => (
                            <div key={index} className="article_tag_name">{tag}</div>
                        ))}
                    </div>
                </div>

                <div className="article_top_post_wrap">
                    <h3 className="main_heading">top post</h3>
                    <div className="article_tp_list">
                        {topPosts.map((topPost, index) => (
                            <NavLink to={`/article/${topPost.key}/${topPost.id}`} key={index} className="article_tp_list_item" title={topPost.title}>
                                <div className="article_tp_list_img">
                                    <img src={topPost.image} alt="image" />
                                </div>
                                <div className="article_tp_list_content">
                                    <h6 className="article_tp_list_title">
                                        {topPost.title}
                                    </h6>
                                    <div className="article_tp_list_cont">{topPost.content}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <img src={adImage} />
                <img src={adImage} />
            </div>
            <div className="ad_comments_wrap">
                <h3 className="main_heading">Comments</h3>
                {isLoadingComments ? (
                    <p>Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : (
                    <div className="ad_comments_list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="ad_comment">
                                <div className="ad_comment_header">
                                    <div className="ad_comment_img">
                                        <img src={'https://via.placeholder.com/150'} alt="User Avatar" />
                                    </div>
                                    <div className="ad_comment_name">
                                        <h6 className="ad_comment_name_title">{comment.user?.username || 'Anonymous'}</h6>
                                        <p className="ad_comment_name_date">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                                                <path d="M6.53125 2.5H10.4688V1.40625C10.4688 1.05078 10.7422 0.75 11.125 0.75C11.4805 0.75 11.7812 1.05078 11.7812 1.40625V2.5H12.875C13.832 2.5 14.625 3.29297 14.625 4.25V13C14.625 13.9844 13.832 14.75 12.875 14.75H4.125C3.14062 14.75 2.375 13.9844 2.375 13V4.25C2.375 3.29297 3.14062 2.5 4.125 2.5H5.21875V1.40625C5.21875 1.05078 5.49219 0.75 5.875 0.75C6.23047 0.75 6.53125 1.05078 6.53125 1.40625V2.5ZM3.6875 13C3.6875 13.2461 3.87891 13.4375 4.125 13.4375H12.875C13.0938 13.4375 13.3125 13.2461 13.3125 13V6H3.6875V13Z" fill="#3E3232" fillOpacity="0.5" />
                                            </svg>
                                            <span>{comment.date || '2022-01-01 12:00'}</span>
                                        </p>
                                    </div>
                                    <button className="ad_comment_reply_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14.7539 6.95703L9.94141 11.0859C9.53125 11.4414 8.875 11.1406 8.875 10.5938V8.21484C4.60938 8.26953 2.80469 9.30859 4.03516 13.2734C4.17188 13.7109 3.625 14.0664 3.26953 13.793C2.06641 12.918 1 11.25 1 9.58203C1 5.42578 4.47266 4.52344 8.875 4.46875V2.30859C8.875 1.73438 9.53125 1.43359 9.94141 1.78906L14.7539 5.91797C15.0547 6.21875 15.0547 6.68359 14.7539 6.95703Z" fill="#F81539" />
                                        </svg>
                                        reply
                                    </button>
                                </div>
                                <p className="ad_comment_content">
                                    {comment.body}
                                </p>
                                <div className="article_comment_reply_wrap">
                                    <div className="article_comment_reply_card">
                                        <div className="ad_comment_header">
                                            <div className="ad_comment_img">
                                                <img src={'https://via.placeholder.com/150'} alt="User Avatar" />
                                            </div>
                                            <div className="ad_comment_name">
                                                <h6 className="ad_comment_name_title">{comment.user?.username || 'Anonymous'}</h6>
                                                <p className="ad_comment_name_date">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                                                        <path d="M6.53125 2.5H10.4688V1.40625C10.4688 1.05078 10.7422 0.75 11.125 0.75C11.4805 0.75 11.7812 1.05078 11.7812 1.40625V2.5H12.875C13.832 2.5 14.625 3.29297 14.625 4.25V13C14.625 13.9844 13.832 14.75 12.875 14.75H4.125C3.14062 14.75 2.375 13.9844 2.375 13V4.25C2.375 3.29297 3.14062 2.5 4.125 2.5H5.21875V1.40625C5.21875 1.05078 5.49219 0.75 5.875 0.75C6.23047 0.75 6.53125 1.05078 6.53125 1.40625V2.5ZM3.6875 13C3.6875 13.2461 3.87891 13.4375 4.125 13.4375H12.875C13.0938 13.4375 13.3125 13.2461 13.3125 13V6H3.6875V13Z" fill="#3E3232" fillOpacity="0.5" />
                                                    </svg>
                                                    <span>{comment.date || '2022-01-01 12:00'}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="ad_comment_content">
                                            <input type="hidden" className='commentReply' name="commentReply" />
                                            {comment.body}
                                            <span className="reply-container"></span>
                                        </p>
                                    </div>
                                    <div className="article_comment_reply_card">
                                        <div className="ad_comment_header">
                                            <div className="ad_comment_img">
                                                <img src={'https://via.placeholder.com/150'} alt="User Avatar" />
                                            </div>
                                            <div className="ad_comment_name">
                                                <h6 className="ad_comment_name_title">{comment.user?.username || 'Anonymous'}</h6>
                                                <p className="ad_comment_name_date">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                                                        <path d="M6.53125 2.5H10.4688V1.40625C10.4688 1.05078 10.7422 0.75 11.125 0.75C11.4805 0.75 11.7812 1.05078 11.7812 1.40625V2.5H12.875C13.832 2.5 14.625 3.29297 14.625 4.25V13C14.625 13.9844 13.832 14.75 12.875 14.75H4.125C3.14062 14.75 2.375 13.9844 2.375 13V4.25C2.375 3.29297 3.14062 2.5 4.125 2.5H5.21875V1.40625C5.21875 1.05078 5.49219 0.75 5.875 0.75C6.23047 0.75 6.53125 1.05078 6.53125 1.40625V2.5ZM3.6875 13C3.6875 13.2461 3.87891 13.4375 4.125 13.4375H12.875C13.0938 13.4375 13.3125 13.2461 13.3125 13V6H3.6875V13Z" fill="#3E3232" fillOpacity="0.5" />
                                                    </svg>
                                                    <span>{comment.date || '2022-01-01 12:00'}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="ad_comment_content">
                                            <input type="hidden" className='commentReply' name="commentReply" />
                                            {comment.body}
                                            <span className="reply-container"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleDetails;
