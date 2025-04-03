import './Favorites.css';

function Favorites({ favorites, fetchWeather, removeFavorite }) {
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
      <button onClick={removeFavorite} className="remove-favorite-btn">Ta bort </button> {}
    </div>
  );
}

export default Favorites;
