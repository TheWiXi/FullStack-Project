import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cineapi/proximamente') // Reemplaza con tu endpoint real
      .then(response => response.json())
      .then(data => {
        setMovies(data); 
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        // Manejar el error de alguna manera (mostrar un mensaje, etc.)
      });
  }, []);

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Coming soon</h2>
        <a href="#" className="see-all">See all</a>
      </div>
      <div className="coming-soon">
        {movies.map((movie) => (
          <Link 
            to={`/movie/${movie._id}`} 
            key={movie._id}  // <-- Usa el _id de la película como clave
            className={`movie-preview`} // Puedes eliminar la clase 'active' si no la estás usando
          >
            <div className="movie-preview">
              <img src={movie.gallery[0]} alt={movie.nombre}  className="preview-image" />
              <div className="preview-info">
                <h3 className="preview-title">{movie.nombre}</h3>
                <p className="preview-genre">{movie.genero[0]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ComingSoon;