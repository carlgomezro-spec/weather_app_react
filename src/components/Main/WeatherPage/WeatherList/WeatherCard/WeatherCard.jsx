import React from "react";

const WeatherCard = ({ item }) => {
  const hour = item.dt_txt.split(" ")[1].slice(0, 5); // Ej: 15:00
  const temp = Math.round(item.main.temp);
  const description = item.weather[0].description;
  const icon = item.weather[0].icon;

  return (
    <div className="weather-card">
      <p><strong>{hour}</strong></p>
      
      {/* Icono del clima */}
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />

      <p>{temp}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default WeatherCard;
