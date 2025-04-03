import './Favorites.css';

function Favorites({ favorites, fetchWeather }) {
    if (favorites.length === 0) {
      return null;
    }
  
    return (
      <div className="favorites">
        <h2>Favoriter</h2>
        <div className="favorites-list">
          {favorites.map((city, index) => (
            <button
              key={index}
              onClick={() => fetchWeather(city)}
              className="favorite-btn"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Favorites;