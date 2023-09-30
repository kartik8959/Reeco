// import { useState } from 'react'

// import './App.css'
import Header from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/home/Home';

function App() {

  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="home" element={<Home />} />
      </Routes>
    </Router>
    
      
    </>
  )
}

export default App
