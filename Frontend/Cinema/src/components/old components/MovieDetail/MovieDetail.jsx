import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import './MovieDetail.css';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cineapi/showPelicula?id=${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <header className="detail-header">
        <Link to="/" className="back-button">
          <ChevronLeft />
        </Link>
        <h1>Cinema Selection</h1>
        <button className="more-options">
          <MoreVertical />
        </button>
      </header>
      <div className="movie-poster">
        <img src={movie.gallery[0]} alt={movie.nombre} />
      </div>
      <div className="movie-info">
        <h2>{movie.nombre}</h2>
        <p className="movie-genre">{movie.genero.join(', ')}</p>
        <button className="watch-trailer">Watch Trailer</button>
        <p className="movie-description">{movie.sinopsis}</p>
      </div>
      <div className="cast">
        <h3>Cast</h3>
        <div className="cast-list">
          {movie.cast.map((actor, index) => (
            <div key={index} className="cast-member">
              <img src="/api/placeholder/60/60" alt={actor} />
              <p>{actor}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cinema-selection">
        <h3>Cinema</h3>
        <div className="cinema-option">
          <img src="/api/placeholder/40/40" alt="Cinema logo" />
          <div>
            <h4>Atrium Cinemas</h4>
            <p>Staff Lines, Saladar, Karachi</p>
          </div>
        </div>
      </div>
      <button className="book-now">Book Now</button>
    </div>
  );
};

export default MovieDetail;