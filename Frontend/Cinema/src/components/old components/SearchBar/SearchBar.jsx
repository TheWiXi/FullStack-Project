import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search movie, cinema, genre..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;