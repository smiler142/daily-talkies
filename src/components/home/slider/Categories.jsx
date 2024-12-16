import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Categories = () => {

    let newsCategories = ["HTML", "CSS", "Javascript", "World war", "ReactJS", "MERN", "Performance", "UX", "Website", "Accessibility", "Vue", "Privacy", "Design", "Graphics", "India"];

    return (
        <div className="categories_container">
            <div className="categories_list">
                {newsCategories.map((category, index) => (
                    <NavLink key={index} to={`/category/${category}`} className="categories_list_link">{category}</NavLink>
                ))}
            </div>
        </div>
    );
};

export default Categories;
