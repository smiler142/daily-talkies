// import React, { useState, useEffect } from 'react';
// import config from '../../../../config';
// import WeatherCard from './WeatherCard';

// const WeatherCont = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchWeather = async () => {
//             setLoading(true);
//             try {
//                 const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Mumbai', 'Shanghai', 'Los Angeles', 'Istanbul', 'Sydney', 'Dubai', 'Hong Kong', 'Singapore', 'Bangkok', 'Seoul', 'Beijing', 'São Paulo', 'Cairo', 'Moscow', 'Mexico City', 'Chennai'];

//                 const dataPromises = cities.map((city) =>
//                     fetch(`${config.weatherAPI.URL}/current.json?key=${config.weatherAPI.key}&q=${city}`)
//                         .then((response) => response.json())
//                         .catch((err) => ({ error: err.message }))
//                 );
//                 const data = await Promise.all(dataPromises);
//                 setWeatherData(data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchWeather();
//     }, []);

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };

//     const getGradient = (city) => {
//         const color1 = getRandomColor();
//         const color2 = getRandomColor();
//         return `linear-gradient(135deg, ${color1}, ${color2})`;
//     };


//     if (loading) {
//         return <p>Loading weather data...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <>
//             <div className='weather_container'>
//                 {weatherData.length > 0 &&
//                     weatherData.map((data, index) => (
//                         <div key={index} className='weather_card'
//                             style={{ background: getGradient(data.location.name) }}
//                         >
//                             {data.error ? (
//                                 <p>Error fetching data for {['London', 'Chennai', 'Singapore', 'China', 'Beijing'][index]}</p>
//                             ) : (
//                                 <>
//                                     <div className="weather_card_details">
//                                         <div className="weather_card_details_left">
//                                             <p className="weather_card_details_left_list">
//                                                 Precipitation: {data.current.precip_mm} mm
//                                             </p>
//                                             <p className="weather_card_details_left_list">
//                                                 Humidity: {data.current.humidity}%
//                                             </p>
//                                             <p className="weather_card_details_left_list">
//                                                 Wind: {data.current.wind_kph} km/h
//                                             </p>
//                                         </div>
//                                         <div className="weather_card_details_right">
//                                             <h4 className="weather_card_details_location">{data.location.name}</h4>
//                                             <p className="weather_card_details_date">{data.location.localtime}</p>
//                                         </div>
//                                     </div>
//                                     <div className="weather_card_degree">
//                                         <div className="weather_card_degree_img">
//                                             <img
//                                                 src={`https:${data.current.condition.icon}`}
//                                                 alt="Weather icon"
//                                             />
//                                         </div>
//                                         <span className="weather_card_degree_value">{data.current.temp_c}°C</span>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))}
//             </div>
//         </>
//     );
// };

// export default WeatherCont;
