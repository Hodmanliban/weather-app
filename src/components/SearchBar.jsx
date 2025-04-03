import './SearchBar.css';

function SearchBar({ city, setCity, fetchWeather, saveFavorite }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchWeather(city);
    };
  
    return (
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ange stad"
        />
        <button type="submit">Sök</button>
        <button type="button" onClick={saveFavorite}>
          Spara som favorit
        </button>
      </form>
    );
  }
  
  export default SearchBar;