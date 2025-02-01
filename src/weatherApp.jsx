import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "694325c225ad7ed357487bf880330f0f";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  // Function to Clear Input & Weather Data
  const clearWeather = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div className="parent" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: "10px", padding: "10px" }}>
        Get Weather
      </button>
      <button onClick={clearWeather} style={{ marginLeft: "10px", padding: "10px", backgroundColor: "red", color: "white" }}>
        Clear
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.name}</h3>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>⛅ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
