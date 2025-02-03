import React from "react";

const MovieList = ({ movies, onSelect, onFavorite, showFavoriteButton = false, isFavoritesList = false }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-card">
          <div className="movie-image" onClick={() => onSelect(movie)}>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
          </div>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          {showFavoriteButton && (
            <button 
              onClick={() => onFavorite(movie)}
              className={`favorite-button ${isFavoritesList ? 'remove' : 'add'}`}
            >
              {isFavoritesList ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
          <button 
            onClick={() => onSelect(movie)} 
            className="view-details-button"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;