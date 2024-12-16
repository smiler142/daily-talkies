import React from 'react';
import Header from './components/common/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/common/footer/Footer';
import Pagination from './components/common/pagination/Pagination';

const layout = () => {
  return (
    <>
      <div className="layout_container">
        <Header />
        {/* <Pagination /> */}
        <div className="layout_content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default layout