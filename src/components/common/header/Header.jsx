import React, { useState } from 'react';
import Categories from '../../home/slider/Categories';
import { NavLink, useNavigate } from 'react-router-dom';
import "../../../assets/css/header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const mainLogo = `${import.meta.env.BASE_URL}daily_talkies.png`;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/category/${searchTerm.trim()}`);
    }
  };

  return (
    <>
      <header className="header_container">
        <div className="header_wrap">
          <NavLink to="/" className="brand_logo">
            <picture>
              <source media="(max-width:650px)" srcSet={`${import.meta.env.BASE_URL}brand_logo.png`} />
              <img src={`${import.meta.env.BASE_URL}daily_talkies.png`} alt="Logo"/>
            </picture>
          </NavLink>


          <div className="search_bar_wrap">
            <label className="search_bar">
              <input type="search" name="searchBar" placeholder="Search anything" id="searchBar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} />
            </label>
          </div>
        </div>
        <Categories />
      </header>
    </>
  );
};

export default Header;
