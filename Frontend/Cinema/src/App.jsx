import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom';
import BottomNavigation from './components/BottomNavigation/BottonNavigation';
import ComingSoon from './components/ComingSoon/comingSoon';
import Header from './components/Header/Header';
import NowPlaying from './components/NowPlaying/NowPlaying';
import SearchBar from './components/SearchBar/SearchBar';



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <SearchBar />
        <NowPlaying />
        <ComingSoon />
        <BottomNavigation />
      </div>
    </BrowserRouter>
  )
}

export default App
