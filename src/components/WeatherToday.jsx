import './WeatherToday.css';

const translateWeatherDescription = (description) => {
  const translations = {
    "clear sky": "Klart väder",
    "few clouds": "Några moln",
    "scattered clouds": "Spridda moln",
    "broken clouds": "Delvis molnigt",
    "overcast clouds": "Helt molnigt",
    "shower rain": "Regnskur",
    "rain": "Regn",
    "thunderstorm": "Åska",
    "snow": "Snö",
    "mist": "Dimma",
    "haze": "Dimmigt",
    "fog": "Tjock dimma",
    "sand": "Sandstorm",
    "dust": "Dammstorm",
    "clear": "Klar"
  };

  return translations[description.toLowerCase()] || description; 
};

function WeatherToday({ weather }) {
  
  const translatedDescription = translateWeatherDescription(weather.weather[0].description);

  return (
    <div className="weather-today">
      <h2>Aktuellt väder i {weather.name}</h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className="weather-details">
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p>{translatedDescription}</p> 
          <p>Känns som: {Math.round(weather.main.feels_like)}°C</p>
          <p>Luftfuktighet: {weather.main.humidity}%</p>
          <p>Vindhastighet: {weather.wind.speed} m/s</p>
          <p>Molnighet: {weather.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherToday;
