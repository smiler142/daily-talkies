const config = {
    weatherAPI: {
        URL: 'http://api.weatherapi.com/v1',
        key: import.meta.env.VITE_WEATHER_API_KEY,
    },
    newsAPI: {
        URL: 'https://newsapi.org/v2/everything?language=en&sortBy=publishedAt&',
        key: import.meta.env.VITE_NEWS_API_KEY,
    },
    unsplashAPI: {
        URL: 'https://api.unsplash.com',
        key: import.meta.env.VITE_UNSPLASH_API_KEY,
    },
};

export default config;
