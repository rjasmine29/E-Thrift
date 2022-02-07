import React from 'react';
import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components";
import { CreateListing, Home, Login, Product, Profile, Register, Search } from "./pages";
import './App.css';
import './pages'

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/create-listing" element={<CreateListing />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;