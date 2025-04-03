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

  // Ladda sparade favoritplatser + hämta väderdata direkt
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
    fetchWeatherData(city);
  }, []); // Hämtar väderdata en gång vid sidladdning

  // Hämtar väderdata och prognos
  const fetchWeatherData = async (city) => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error("Fel vid hämtning av väderdata:", error);
      alert("Det gick inte att hämta väderdata. Vänligen försök igen.");
    }
  };

  // Spara en favoritplats
  const saveFavorite = () => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  // Ta bort senaste favorit
  const removeFavorite = () => {
    const updatedFavorites = favorites.slice(0, -1); // Tar bort den sista staden från listan
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Uppdaterar lokal lagring
  };

  return (
    <div className="weather-app">
      <Header />
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeatherData} saveFavorite={saveFavorite} />
      <Favorites favorites={favorites} fetchWeather={fetchWeatherData} removeFavorite={removeFavorite} />
      
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
