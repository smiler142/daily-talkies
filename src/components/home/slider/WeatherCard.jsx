import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import config from "../../../../config";

const unsplashApi = createApi({
    accessKey: config.unsplashAPI.key,
});

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [photoData, setPhotoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const cities = ['Chennai', 'London', 'New York', 'Tokyo', 'Paris', 'Shanghai', 'Los Angeles','Sydney', 'Dubai', 'Hong Kong', 'Seoul', 'Beijing'];

                const dataPromises = cities.map((city) =>
                    fetch(`${config.weatherAPI.URL}/current.json?key=${config.weatherAPI.key}&q=${city}`)
                        .then((response) => response.json())
                        .catch((err) => ({ error: err.message }))
                );

                const data = await Promise.all(dataPromises);
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const result = await unsplashApi.photos.getRandom({
                    count: weatherData.length || 9,
                    query: "weather",
                    orientation: "portrait",
                });

                if (result.errors) throw new Error(result.errors[0]);
                setPhotoData(result.response);
            } catch (err) {
                console.error("Error fetching photos:", err.message);
            }
        };

        if (weatherData.length) fetchPhotos();
    }, [weatherData]);

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        color = color + "80";
        return color;
    };

    const getGradient = () => {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    };

    const WeatherDetail = ({ icon, label, value }) => (
        <div className="weather_card_details_card">
            <div className="weather_card_detail_icon">
                <i className={icon}></i>
            </div>
            <div className="weather_card_detail_text">
                <span className="detail_value">{value}</span>
                <span className="detail_label">{label}</span>
            </div>
        </div>
    );

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="weather_container">
            {weatherData.map((data, index) => (
                <div
                    key={index}
                    className="weather_card"
                    style={{
                        backgroundImage: photoData[index]?.urls?.small
                            ? ` ${getGradient()}, url(${photoData[index].urls.small})`
                            : getGradient(),
                        backgroundBlendMode: "overlay",
                        backgroundBlendMode: "soft-light, overlay",

                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {data.error ? (
                        <p>Error fetching data for {data.location?.name || "Unknown City"}</p>
                    ) : (
                        <div className="weather_card_inner_wrap">
                            <div className="weather_card_main">
                                <div className="weather_card_degree_img">
                                    <img
                                        src={`https:${data.current.condition.icon}`}
                                        alt={data.current.condition.text}
                                    />
                                </div>
                                <h3 className="weather_card_degree_value">{data.current.temp_c}°C</h3>
                                <h4 className="weather_card_details_location">{data.location.name}</h4>
                                <p className="weather_card_details_date">{data.location.localtime}</p>
                            </div>

                            <div className="weather_card_details">
                                <WeatherDetail
                                    icon="fa-solid fa-cloud"
                                    label="Humidity"
                                    value={`${data.current.humidity}%`}
                                />
                                <WeatherDetail
                                    icon="fa-solid fa-wind"
                                    label="Wind Speed"
                                    value={`${data.current.wind_kph} km/h`}
                                />
                                <WeatherDetail
                                    icon="fa-solid fa-temperature-high"
                                    label="Feels Like"
                                    value={`${data.current.feelslike_c}°C`}
                                />
                                <WeatherDetail
                                    icon="fa-solid fa-droplet"
                                    label="Precipitation"
                                    value={`${data.current.precip_mm} mm`}
                                />
                                <WeatherDetail
                                    icon="fa-solid fa-eye"
                                    label="Visibility"
                                    value={`${data.current.vis_km} km`}
                                />
                                <WeatherDetail
                                    icon="fa-solid fa-gauge-high"
                                    label="Pressure"
                                    value={`${data.current.pressure_mb} hPa`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WeatherCard;