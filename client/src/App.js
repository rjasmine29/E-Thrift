import React from 'react';
import { Routes, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { NavBar } from "./components";
import { CreateListing, Home, Login, Product, Profile, Register, Search } from "./pages";
import './App.css';
import './pages'

const App = () => {
  function isAuthenticated() {
    const token = localStorage.getItem('authTokens');
    let authToken = JSON.parse(localStorage.getItem("authTokens"))

    if (authToken != null) {
      const refreshToken = authToken.refresh;
      try {
        jwt_decode(token);
        const { exp } = jwt_decode(refreshToken);

        if ((new Date(Date.now() + 5000)) - (new Date(exp * 1000)) > 0) {
          const here = async () => {
            let options = {
              method: "POST",
              body: JSON.stringify(JSON.parse(localStorage.getItem("authTokens"))),
              headers: { "Content-type": "application/json" },
            };

            let data = await fetch("http://127.0.0.1:8000/user/logout", options)
            await data.json();
            localStorage.clear()

          }
          here()

          return false;
        }
      } catch (err) {
        return false;
      }
      return true;
    }

  }

  // This will constantly check if the token is valid. If not, then it will sign out and clear the token
  setInterval(isAuthenticated, 100)

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