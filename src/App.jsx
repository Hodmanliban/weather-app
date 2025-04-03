import { useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "./services/weatherServices"; 
import SearchBar from "./components/SearchBar";
import WeatherToday from "./components/WeatherToday";
import Forecast from "./components/Forecast";
import Favorites from "./components/Favorites";
import Header from "./components/Header";

function App() {
  const [city, setCity] = useState("Stockholm");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
    fetchWeatherData(city);
  }, [city]);


  const fetchWeatherData = async (city) => {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);

    setWeather(weatherData);
    setForecast(forecastData);
  };


  const saveFavorite = () => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  return (
    <div className="weather-app">
      <Header />
      <SearchBar city={city} setCity={setCity} />
      <Favorites favorites={favorites} fetchWeather={fetchWeatherData} />
      
      {weather && forecast && (
        <div className="weather-layout">
          <WeatherToday weather={weather} />
          <Forecast forecast={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;

