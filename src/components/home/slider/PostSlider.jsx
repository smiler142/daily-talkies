import React, { useEffect, useState } from 'react';
import { storeToLocalStorage, fetchFromLocalStorage, fetchData, fetchFromDatabase, toggleBookmark, initializeSwiper } from '../../utils/Utils';
import 'swiper/css/bundle';
import config from "../../../../config"
import { NavLink } from 'react-router-dom';
import userImg from "../../../assets/images/user_img.jpg"


const PostSlider = ({ title, localStorageKey, swiperClass }) => {
    const [posts, setPosts] = useState([]);
    const [filledItems, setFilledItems] = useState({});

    const url = `${config.newsAPI.URL}q=${title}&apiKey=${config.newsAPI.key}`;
    // console.log(url);

    // useEffect(() => {
    //     fetchFromDatabase(apiUrl).then((data) => {
    //         if (data) {
    //             console.log(data);
    //             const articles = data.map((article) => ({
    //                 key: article.key,
    //                 id: article.id,
    //                 title: article.title || 'No Title Available',
    //                 content: article.description || 'No Description Available',
    //                 image: article.urlToImage || 'https://via.placeholder.com/150',
    //                 user: {
    //                     name: article.author || 'Anonymous',
    //                     image: article.userImage || 'https://via.placeholder.com/50',
    //                 },
    //                 date: new Date(article.publishedAt).toLocaleDateString() || 'Unknown Date',
    //             }));
    //             setPosts(articles);
    //         }
    //     });
    // }, [apiUrl]);

    useEffect(() => {
        const storedPosts = fetchFromLocalStorage(localStorageKey);

        if (storedPosts) {
            setPosts(storedPosts);
        } else {
            fetchData(url).then((data) => {
                if (data && data.articles) {
                    const articles = data.articles.map((article, index) => ({
                        key: localStorageKey,
                        id: `${localStorageKey}-${index}`,
                        title: article.title || 'No Title Available',
                        content: article.content || 'No Description Available',
                        image: article.urlToImage || 'https://via.placeholder.com/150',
                        url: article.url || '#',
                        source: {
                            id: article.source?.id || 'unknown',
                            name: article.source?.name || 'Unknown Source',
                        },
                        user: {
                            name: article.author || 'Anonymous',
                            image: `https://randomuser.me/api/portraits/men/${index}.jpg`,
                        },
                        date: new Date(article.publishedAt).toLocaleDateString() || 'Unknown Date',
                        raw: article,
                    }));
                    setPosts(articles);
                    storeToLocalStorage(localStorageKey, articles);
                }
            });
        }
    }, [localStorageKey, url]);


    useEffect(() => {
        const slidesPerViewConfig = {
            540: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
        };
        const swiper = initializeSwiper(`.${swiperClass}`, slidesPerViewConfig);

        return () => swiper.destroy(true, true);
    }, [posts, swiperClass]);

    return (
        <div className={`${swiperClass}_container post_container`}>
            <div className="main_heading_wrap">
                <h3 className="main_heading">{title} posts</h3>
                <div className="swiper_button_wrap">
                    <button className="prev_button" aria-label="Previous Slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 18C9.71875 18 9.46875 17.9062 9.28125 17.7188C8.875 17.3438 8.875 16.6875 9.28125 16.3125L13.5625 12L9.28125 7.71875C8.875 7.34375 8.875 6.6875 9.28125 6.3125C9.65625 5.90625 10.3125 5.90625 10.6875 6.3125L15.6875 11.3125C16.0938 11.6875 16.0938 12.3438 15.6875 12.7188L10.6875 17.7188C10.5 17.9062 10.25 18 10 18Z" fill="#F81539" />
                        </svg>
                    </button>
                    <button className="next_button" aria-label="Next Slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 18C9.71875 18 9.46875 17.9062 9.28125 17.7188C8.875 17.3438 8.875 16.6875 9.28125 16.3125L13.5625 12L9.28125 7.71875C8.875 7.34375 8.875 6.6875 9.28125 6.3125C9.65625 5.90625 10.3125 5.90625 10.6875 6.3125L15.6875 11.3125C16.0938 11.6875 16.0938 12.3438 15.6875 12.7188L10.6875 17.7188C10.5 17.9062 10.25 18 10 18Z" fill="#F81539" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={swiperClass}>
                <div className="swiper-wrapper">
                    {posts.map((post,index) => (
                        <div key={post.id} className="swiper-slide post_slide">
                            <NavLink to={`/article/${post.key}/${post.id}`}>
                                <div className={`post_slide_img ${post.image === 'https://via.placeholder.com/150' ? 'loading' : ''}`}>
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <h4 className="post_title" title={post.title}>{post.title}</h4>
                            </NavLink>
                            <p className="post_content">{post.content}</p>
                            <div className="post_slide_user">
                                <div className="post_slide_user_img">
                                    <img src={post.user.image} alt={post.user.name} />
                                </div>
                                <div className="post_slide_user_cont">
                                    <h5 className="post_slide_user_name">{post.user.name}</h5>
                                    <p className="post_slide_user_date">{post.date}</p>
                                </div>
                                <div className="post_slide_bookmark" onClick={(e) => { toggleBookmark(post.id, setFilledItems, e); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`bookmark-icon ${filledItems[post.id] ? 'filled' : ''}`} viewBox="0 0 20 21">
                                        <path d="M15.625 0C16.6406 0 17.5 0.859375 17.5 1.875V18.75C17.5 19.7266 16.4453 20.3125 15.5859 19.8438L10 16.5625L4.375 19.8438C3.51562 20.3125 2.5 19.7266 2.5 18.75V1.875C2.5 0.859375 3.32031 0 4.375 0H15.625Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PostSlider;
