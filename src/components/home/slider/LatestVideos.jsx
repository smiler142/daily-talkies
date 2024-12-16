import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const LatestVideos = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const videoRefs = useRef([]);

    const videoUrl =
        "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json";

    useEffect(() => {
        fetch(videoUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch videos");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setVideos(data);
                } else {
                    throw new Error("Invalid data format");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        const swiper = new Swiper(".latest_video_swiper", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 1.2,
                },
                900: {
                    slidesPerView: 1.5,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
            },
            navigation: {
                prevEl: ".latest_video_container .prev_button",
                nextEl: ".latest_video_container .next_button",
            },
        });

        return () => {
            swiper.destroy(true, true);
        };
    }, [videos]);

    const togglePlayPause = (id, index) => {
        const videoElement = videoRefs.current[index];
        const overlayElement = videoElement.nextSibling;

        if (currentVideoId === id) {
            videoElement.pause();
            setCurrentVideoId(null);
            overlayElement.classList.remove("fade-out");
            overlayElement.classList.add("fade-in");
        } else {
            if (currentVideoId !== null) {
                const previousIndex = videos.findIndex((video) => video.id === currentVideoId);
                if (videoRefs.current[previousIndex]) {
                    videoRefs.current[previousIndex].pause();
                    const previousOverlay = videoRefs.current[previousIndex].nextSibling;
                    previousOverlay.classList.remove("fade-out");
                    previousOverlay.classList.add("fade-in");
                }
            }
            videoElement.play();
            setCurrentVideoId(id);
            overlayElement.classList.remove("fade-in");
            overlayElement.classList.add("fade-out");
        }
    };

    return (
        <div className="latest_video_container post_container">
            <div className="main_heading_wrap">
                <h3 className="main_heading">Latest Videos</h3>
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
            {error ? (
                <div className="error_message">Error: {error}</div>
            ) : (
                <div className="latest_video_swiper">
                    <div className="swiper-wrapper">
                        {videos.map((video, index) => (
                            <div key={video.id} className="swiper-slide video_slide">
                                <video ref={(el) => (videoRefs.current[index] = el)} className="video_player" poster={video.thumbnailUrl} >
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video_slide_overlay fade-in">
                                    <h4 className="video_title" title={video.title}>
                                        {video.title || "No Title"}
                                    </h4>
                                    <p className="video_content">{video.description || "No Content Available"}</p>
                                </div>
                                <div onClick={() => togglePlayPause(video.id, index)} className="videoPlayBtn" >
                                    <CSSTransition in={currentVideoId === video.id} timeout={300} classNames="icon" >
                                        {currentVideoId === video.id ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 72 72" fill="none">
                                                <rect x="20" y="15" width="10" height="42" fill="#F81539" />
                                                <rect x="42" y="15" width="10" height="42" fill="#F81539" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 72 72" fill="none">
                                                <path d="M51.8438 32.1562C53.1562 33 54 34.5 54 36C54 37.5938 53.1562 39.0938 51.8438 39.8438L24.8438 56.3438C23.4375 57.1875 21.6562 57.2812 20.25 56.4375C18.8438 55.6875 18 54.1875 18 52.5V19.5C18 17.9062 18.8438 16.4062 20.25 15.6562C21.6562 14.8125 23.4375 14.8125 24.8438 15.75L51.8438 32.1562Z" fill="#F81539" />
                                            </svg>
                                        )}
                                    </CSSTransition>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestVideos;
