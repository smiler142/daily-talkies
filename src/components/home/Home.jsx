import React from 'react';
import "../../assets/css/home.css"
import LatestVideos from './slider/LatestVideos';
import WeatherCont from './slider/WeatherCont';
import PostSlider from './slider/PostSlider';
import WeatherCard from './slider/WeatherCard';

const Home = () => {
  return (
    <>
      <PostSlider
        title="new"
        localStorageKey="newPosts"
        swiperClass="new_post_swiper"
      />


      <div className="post_container">
        <div className="main_heading_wrap">
          <h3 className="main_heading">Weather Cards</h3>
        </div>
        <WeatherCard/>
      </div>

      <PostSlider
        title="india"
        localStorageKey="indiaPosts"
        swiperClass="india_post_swiper"
      />

      <LatestVideos />

      <PostSlider
        title="business"
        localStorageKey="businessPosts"
        swiperClass="business_post_swiper"
      />

      <PostSlider
        title="entertainment"
        localStorageKey="entertainmentPosts"
        swiperClass="entertainment_post_swiper"
      />
    </>
  )
}


const css = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default Home