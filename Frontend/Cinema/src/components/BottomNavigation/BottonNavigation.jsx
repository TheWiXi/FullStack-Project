import React from 'react';
import { Home, Search, Ticket, User } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">
      <a href="#" className="nav-item active">
        <Home className="nav-icon" />
      </a>
      <a href="#" className="nav-item">
        <Search className="nav-icon" />
      </a>
      <a href="#" className="nav-item">
        <Ticket className="nav-icon" />
      </a>
      <a href="#" className="nav-item">
        <User className="nav-icon" />
      </a>
    </nav>
  );
};

export default BottomNavigation;