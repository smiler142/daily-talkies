import React, { useEffect, useState } from 'react';
import { storeToLocalStorage, fetchFromLocalStorage, fetchData, toggleBookmark } from '../utils/Utils';
import 'swiper/css/bundle';
import "../../assets/css/category.css"
import config from "../../../config"
import { NavLink, useParams } from 'react-router-dom';


const ITEMS_PER_PAGE = 12; // Number of items per page
const Category = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filledItems, setFilledItems] = useState({});

    const { key } = useParams();

    let keyWord = key,
        url = `${config.newsAPI.URL}q=${key}&apiKey=${config.newsAPI.key}`;

    useEffect(() => {
        const storedPosts = fetchFromLocalStorage(keyWord);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (storedPosts) {
            setPosts(storedPosts);
        } else {
            fetchData(url).then((data) => {
                if (data && data.articles) {
                    const articles = data.articles.map((article, index) => ({
                        key: keyWord,
                        id: `${keyWord}-${index}`,
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
                            image: 'https://via.placeholder.com/50',
                        },
                        date: new Date(article.publishedAt).toLocaleDateString() || 'Unknown Date',
                        raw: article,
                    }));
                    setPosts(articles);
                    storeToLocalStorage(keyWord, articles);
                }
            });
        }
    }, [keyWord, url]);

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedPosts = posts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const generatePagination = () => {
        const pages = [];
        if (totalPages <= 1) return pages;

        pages.push(
            <div key="first" className={`category_pagination_item ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePageChange(1)}>
                1
            </div>
        );

        if (currentPage > 3) {
            pages.push(<div key="dots-start" className="category_pagination_item dots">...</div>);
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(
                <div key={i} className={`category_pagination_item ${i === currentPage ? 'active' : ''}`} onClick={() => handlePageChange(i)}>
                    {i}
                </div>
            );
        }

        if (currentPage < totalPages - 2) {
            pages.push(<div key="dots-end" className="category_pagination_item dots">...</div>);
        }

        pages.push(
            <div key="last" className={`category_pagination_item ${currentPage === totalPages ? 'active' : ''}`} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </div>
        );

        return pages;
    };

    return (
        <div className="category_container">
            <div className="main_heading_wrap">
                <h3 className="main_heading">Category : <span>{keyWord}</span></h3>
            </div>
            <div className="category_inner_wrap">
                {paginatedPosts.map((post) => (
                    <div key={post.id} className="post_slide" title={post.title}>
                        <NavLink to={`/article/${post.key}/${post.id}`}>
                            <div className="post_slide_img">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <h4 className="post_title">{post.title}</h4>
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
            <div className="category_pagination_wrap">
                <div className="category_pagination_list">
                    <div className={`category_pagination_item prev_btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                        prev
                    </div>
                    <div className="category_pagination_list_wrap">
                        {generatePagination()}
                    </div>
                    <div className={`category_pagination_item next_btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
                        next
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
