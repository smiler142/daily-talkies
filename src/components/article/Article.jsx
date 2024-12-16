import React from 'react'
import AddComment from './AddComment'
import "../../assets/css/article.css"
import PostSlider from '../home/slider/PostSlider'
import ArticleDetails from './ArticleDetails'

const Article = () => {
    return (
        <>
            <div className="article_container">
                <ArticleDetails />
                <AddComment />
                <PostSlider
                    title="related"
                    localStorageKey="relatedPosts"
                    swiperClass="related_post_swiper"
                />
            </div>
        </>
    )
}

export default Article
