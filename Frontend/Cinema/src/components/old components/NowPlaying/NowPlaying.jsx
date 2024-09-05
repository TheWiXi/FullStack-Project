import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NowPlaying.css';

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/cineapi/showCartelera');
        const data = await response.json();
        setMovies([...data, ...data, ...data]); // Duplicar películas para efecto infinito
        setCurrentIndex(data.length); // Iniciar en la primera película central
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (carouselRef.current && movies.length > 0) {
      const itemWidth = carouselRef.current.scrollWidth / movies.length;
      
      // Mover el carrusel al centro de la película seleccionada
      const scrollPosition = itemWidth * currentIndex - carouselRef.current.offsetWidth / 2 + itemWidth / 2;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, movies]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft + carouselRef.current.offsetWidth / 2;
      const itemWidth = carouselRef.current.scrollWidth / movies.length;
      const index = Math.round(scrollPosition / itemWidth);

      if (index >= movies.length - movies.length / 3) {
        // Si llegamos al final, reseteamos al inicio
        setCurrentIndex(movies.length / 3);
        carouselRef.current.scrollLeft = itemWidth * (movies.length / 3) - carouselRef.current.offsetWidth / 2 + itemWidth / 2;
      } else if (index <= movies.length / 3) {
        // Si llegamos al principio, saltamos al final
        setCurrentIndex(movies.length - movies.length / 3);
        carouselRef.current.scrollLeft = itemWidth * (movies.length - movies.length / 3) - carouselRef.current.offsetWidth / 2 + itemWidth / 2;
      } else {
        setCurrentIndex(index);
      }
    }
  };

  return (
    <div className="now-playing">
      <div className="section-header">
        <h2 className="section-title">Now playing</h2>
        <a href="#" className="see-all">See all</a>
      </div>
      <div className="carousel-container">
        <div 
          className="movie-carousel" 
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {movies.map((movie, index) => (
            <Link 
              to={`/movie/${movie._id}`} 
              key={index} 
              className={`movie-poster ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={movie.gallery[0]} alt={movie.nombre} className="poster-image" />
              <h3>{movie.nombre}</h3>
              <p>{movie.genero[0]}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        {movies.slice(0, movies.length / 3).map((_, index) => (
          <div 
            key={index} 
            className={`indicator ${index === currentIndex % (movies.length / 3) ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index + movies.length / 3)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
