import './Forecast.css';

function Forecast({ forecast }) {
  if (!forecast || !forecast.list) {
    return <p>Laddar väderprognos...</p>;
  }

  const dailyForecasts = [];
  const seenDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecasts.push(item);
    }
  });

  return (
    <div className="forecast">
      <h2>Väderprognos</h2>
      <div className="forecast-list">
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString('sv-SE', { weekday: 'long' });
          const dayMonth = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });

          const isToday = index === 0;

          return (
            <div key={index} className={`forecast-item ${isToday ? 'today' : ''}`}>
              <p className="forecast-date">{dayName} {dayMonth}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
              <p className="forecast-desc">{item.weather[0].description}</p>
              <p>Min: {Math.round(item.main.temp_min)}°C | Max: {Math.round(item.main.temp_max)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
