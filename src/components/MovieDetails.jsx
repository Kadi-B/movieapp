import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const API_KEY = "2f0de1f4";
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  if (loading) {
    return <div className="movie-details loading">Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="movie-details-header">
          <img src={details?.Poster} alt={details?.Title} className="detail-poster" />
          <div className="movie-info">
            <h2>{details?.Title}</h2>
            <div className="movie-meta">
              <span className="year">{details?.Year}</span>
              <span className="rating">{details?.Rated}</span>
              <span className="runtime">{details?.Runtime}</span>
            </div>
            <div className="genre">{details?.Genre}</div>
            <div className="ratings">
              {details?.Ratings?.map((rating, index) => (
                <div key={index} className="rating-item">
                  <span className="rating-source">{rating.Source}:</span>
                  <span className="rating-value">{rating.Value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="movie-details-body">
          <p className="plot">{details?.Plot}</p>
          <div className="additional-info">
            <p><strong>Director:</strong> {details?.Director}</p>
            <p><strong>Writers:</strong> {details?.Writer}</p>
            <p><strong>Actors:</strong> {details?.Actors}</p>
            <p><strong>Language:</strong> {details?.Language}</p>
            <p><strong>Country:</strong> {details?.Country}</p>
            <p><strong>Awards:</strong> {details?.Awards}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;