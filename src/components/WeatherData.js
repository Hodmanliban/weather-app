import axios from "axios";


const fetchWeatherData = (selectedCity, setWeather, setForecast, API_KEY) => {
 
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`)
    .then((res) => {
      setWeather(res.data);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("Kunde inte hitta väder för den staden");
    });

 
  axios
    .get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric`)
    .then((res) => {
    
      const dailyForecasts = [];
      const days = {};

      res.data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString(); 
        if (!days[date]) {
          days[date] = true;
          dailyForecasts.push(item); 
        }
      });

     
      const filteredForecasts = dailyForecasts.slice(0, 6); 
      setForecast(filteredForecasts); 
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    });
};

export default { fetchWeatherData };
