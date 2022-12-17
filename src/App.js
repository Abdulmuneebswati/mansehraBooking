// import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import List from './Pages/Lists/List';
import Hotel from './Pages/Hotel/Hotel';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/hotels' element={<List/>} />
        <Route path='/hotels/:id' element={<Hotel/>} />
        <Route path='/login' element={<Login/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
