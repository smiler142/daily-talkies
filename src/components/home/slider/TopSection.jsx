import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { storeToLocalStorage, fetchFromLocalStorage, fetchData, initializeSwiper } from '../../utils/Utils';
import config from "../../../../config"

const TopSection = ({ title, localStorageKey, swiperClass }) => {
    const [posts, setPosts] = useState([]);
    const url = `${config.newsAPI.URL}q=${title}&apiKey=${config.newsAPI.key}`;

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

        const slidesConfig = {
            breakpoints: {
                540: { slidesPerView: 1 }
            }
        };
        const swiper = initializeSwiper(`.${swiperClass}`, slidesConfig);

        return () => swiper.destroy(true, true);
    }, [posts, swiperClass]);

    return (
        <>
            <div className="top_section_wrap">
                <div className="primary_card">
                    <div className="primary_card_main">
                        <div className="primary_card_img">
                            <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="image" />
                        </div>
                        <div className="primary_card_main_details">
                            <div className="primary_card_user_name">WordPress Security</div>
                            <div className="primary_card_title">
                                What is Server-Side Request Forgery (SSRF)?
                            </div>
                            <div className="primary_card_date">December 5, 2024</div>
                        </div>
                    </div>
                    <p className="primary_card_details">
                        Server-Side Request Forgery (SSRF) is a critical web application vulnerability where attackers manipulate a server to make unauthorized requests. 
                        SSRF is particularly dangerous and is therefore recognized as one of the top 10 cybersecurity vulnerabilities by the Open Worldwide Application Security Project (OWASP).
                        <a className="article_forward_link" href="https://www.sitelock.com/blog/what-is-ssrf/" target="_blank">Click to read more...</a>
                    </p>
                </div>

                <div className={`${swiperClass}_container post_container`}>
                    <div className={swiperClass}>
                        <div className="swiper-wrapper">
                            {posts.map((post, index) => (
                                <div key={post.id} className="swiper-slide top_section_slide">
                                    <div className={`post_slide_img ${post.image === 'https://via.placeholder.com/150' ? 'loading' : ''}`}>
                                        <img src={post.image} alt={post.title} className="top_section_slide_img" />
                                    </div>
                                    <NavLink to={`/article/${post.key}/${post.id}`}>
                                        <div className="video_slide_overlay fade-in">
                                            <h4 className="video_title" title={post.title}>
                                                {post.title || "No Title"}
                                            </h4>
                                            <p className="video_content">{post.content || "No Content Available"}</p>
                                        </div>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="swiper_button_wrap top_section_btn_wrap">
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
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </>
    )
}

export default TopSection
