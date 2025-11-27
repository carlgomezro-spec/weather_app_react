import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherList from "./WeatherList/WeatherList";
import ClipLoader from "react-spinners/ClipLoader";   // <-- SPINNER IMPORTADO

const WeatherPage = () => {
  const [city, setCity] = useState("Madrid");     // Ciudad actual para buscar
  const [input, setInput] = useState("Madrid");   // Input controlado
  const [posts, setPosts] = useState([]);         // Datos
  const [error, setError] = useState("");         // Errores
  const [loading, setLoading] = useState(false);  // Estado de carga para el spinner

  // GEOLOCALIZACIÓN: solo se ejecuta la PRIMERA VEZ que cargas la app
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCity(`${latitude},${longitude}`);
        setInput(""); // opcional: limpiar el input porque no es texto
      },
      () => {
        console.log("⚠ Permiso denegado. Se usará Madrid como ciudad inicial.");
      }
    );
  }, []);

  // Llamada a la API con axios cuando cambia la ciudad
  useEffect(() => {
    async function fetchWeather() {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

      try {
        setError("");
        setLoading(true); // <-- Inicia el spinner

        let url = "";

        if (city.includes(",")) {
          const [lat, lon] = city.split(",");
          url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${apiKey}`;
        }

        const res = await axios.get(url);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Retardo simulado

        setPosts(res.data.list);
      } catch (e) {
        console.error("Error:", e);
        setPosts([]);
        setError("Ciudad no encontrada");
      } finally {
        setLoading(false); // <-- Detiene el spinner
      }
    }

    if (city) fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") setCity(input);
  };

  return (
    <section className="weather-page">
      <h1>¿Qué tiempo hace hoy?</h1>

      {/* Buscador */}
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          className="weather-input"
          value={input}
          placeholder="Buscar ciudad..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="weather-button" type="submit">Buscar</button>
      </form>

      {/* Error */}
      {error && <p className="weather-error">{error}</p>}

      {/* Spinner mientras carga */}
      {loading && (
        <div className="spinner-container">
          <ClipLoader size={50} color="#007bff" />
        </div>
      )}

      {/* Lista del tiempo */}
      {!loading && posts.length !== 0 && <WeatherList data={posts} />}
    </section>
  );
};

export default WeatherPage;
