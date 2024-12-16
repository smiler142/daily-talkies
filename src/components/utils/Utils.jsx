import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


const STORAGE_EXPIRY_TIME = 240 * 60 * 1000;

export const storeToLocalStorage = (key, data) => {
    const item = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const fetchFromDatabase = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data from database:', error);
        return [];
    }
};


export const fetchFromLocalStorage = (key) => {
    const storedItem = localStorage.getItem(key);
    if (!storedItem) return null;

    try {
        const { data, timestamp } = JSON.parse(storedItem);

        if (Date.now() - timestamp > STORAGE_EXPIRY_TIME) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error parsing localStorage item:', error);
        localStorage.removeItem(key);
        return null;
    }
};


// Data Fetch Utility
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// Bookmark Toggle Utility
export const toggleBookmark = (id, setFilledItems, event) => {
    event.stopPropagation();
    setFilledItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
    }));
};


export const initializeSwiper = (selector, slidesPerViewConfig) => {

    const container = document.querySelector(selector).closest(".post_container");
    const prevButton = container.querySelector(".prev_button");
    const nextButton = container.querySelector(".next_button");

    return new Swiper(selector, {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        breakpoints: slidesPerViewConfig,
        navigation: {
            prevEl: prevButton,
            nextEl: nextButton,
        },
    });
};
