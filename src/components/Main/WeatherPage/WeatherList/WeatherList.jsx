import React from "react";
import { v4 as uuidv4 } from "uuid";
import WeatherCard from "./WeatherCard/WeatherCard";

const WeatherList = ({ data }) => {
  // Agrupar por día
  const days = data.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // Ej: 2025-11-26
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="weather-list">
      {Object.entries(days).map(([day, items]) => (
        <div key={uuidv4()} className="weather-day">
          <h2>{new Date(day).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</h2>

          {/* Lista de tarjetas horarias */}
          <div className="weather-cards">
            {items.map((item) => (
              <WeatherCard key={uuidv4()} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
