import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from "./Components/Login";
import Signup from "./Components/Signup"; 
import Timeline from './Components/Timeline';
import PhotoGallery from './Components/PhotoGallery';
import Albums from './Components/Albums';
import Users from './Components/Users';
import Todos from './Components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/photogallery" element={<PhotoGallery />} />
        <Route path='/albums' element={<Albums/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/todos' element={<Todos/>} />

      </Routes>
    </div>
  </Router>

  );
}

export default App;

