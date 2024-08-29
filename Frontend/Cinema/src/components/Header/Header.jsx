import React from 'react';
import { Bell } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="user-info">
        <img src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png" alt="User" className="user-avatar" />
        <div className="user-greeting">
          <p className="greeting-text">Hi, {import.meta.env.VITE_USER} !</p>
          <p className="invitation-text">Let's watch movie together!</p>
        </div>
      </div>
      <Bell className="notification-icon" />
    </header>
  );
};

export default Header;