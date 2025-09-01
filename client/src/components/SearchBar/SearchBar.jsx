import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a Pokemon name");
      return;
    }
    setError("");
    onSearch(searchQuery);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__row">
        <input
          type="text"
          placeholder="Enter a Pokemon name"
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </div>
      {error && <p className="search-bar__error">{error}</p>}
    </form>
  );
}

export default SearchBar;
