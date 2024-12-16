import React from 'react'
import { NavLink } from 'react-router-dom'

const FooterCategories = () => {

    let newsCategory = ["/","category", "article", "culture", "fashion", "featured", "food", "healthy living", "technology"]

    let newsCategories = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];

    return (
        <>
            <div className="footer-categories">
                <h3 className="main_heading">Categories</h3>
                <div className='footer_category_list'>
                    {newsCategories.map((category, index) => (
                        <NavLink key={index} to={`/category/${category}`} className="footer_category_link">{category}</NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FooterCategories
