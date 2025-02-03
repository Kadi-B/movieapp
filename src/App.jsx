import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    const API_KEY = "2f0de1f4";
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      
      if (response.data.Search) {
        // Filter results that contain 'Nigeria' in the title or description
        const filteredMovies = response.data.Search.filter(movie => 
          movie.Title.toLowerCase().includes("nigeria") || movie.Title.toLowerCase().includes("nollywood")
        );
        setMovies(filteredMovies.length > 0 ? filteredMovies : response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
  };

  return (
    <div className="container">
      <div className="header-container">
        <div className="title-wrapper">
          <h1 className="app-title" style={{ 
            textAlign: 'left', 
            marginRight: '20px',
            marginTop: '0',
            paddingTop: '20px',
            position: 'absolute',
            left: '20px',
            top: '0'
          }}>
            Life Movie Box
            
          </h1>
        </div>
        <div className="search-container" style={{ marginTop: '80px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      <main className="main-content">
        <section className="movies-section">
          <MovieList
            movies={movies}
            onSelect={(movie) => setSelectedMovie(movie)}
            onFavorite={addFavorite}
            showFavoriteButton={true}
          />
        </section>

        {selectedMovie && (
          <section className="movie-details">
            <MovieDetails 
              movie={selectedMovie} 
              onClose={() => setSelectedMovie(null)}
            />
          </section>
        )}
        
        <section className="favorites-section">
          <h2>Favorites</h2>
          <MovieList 
            movies={favorites} 
            onSelect={(movie) => setSelectedMovie(movie)}
            onFavorite={removeFavorite}
            showFavoriteButton={true}
            isFavoritesList={true}
          />
        </section>
      </main>
    </div>
  );
};

export default App;