import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { postLogOut } from "../../helpers/requests";

function NavBar({ username, setUsername }) {

  useEffect(() => {
    setUsername(localStorage.getItem("username") || null);
    window.addEventListener("storage", storageEventHandler);
  }, []);

  const storageEventHandler = () => {
    console.log("storage updated");
    setUsername(localStorage.getItem("username") || null);
  };

  const logOut = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem('authTokens'));
        await postLogOut(tokens);
        localStorage.clear();
        setUsername(null);
      } catch (err) {
          console.warn(`Error logging out ${username}`);
      }
  };

  return (
    <nav className="navbar">
      <NavLink to="">Logo</NavLink>
      {username !== null && (
        <>
          <NavLink to="/create">Create Listing</NavLink>
          <div className="nav-option">
            <span className="nav-option-text"></span>
            <button id="logout-btn" onClick={logOut}>
              Sign Out
            </button>
          </div>
        </>
      )}
      {username === null && (
        <>
          <NavLink to="/register">Sign Up</NavLink>
          <NavLink to="/login">Login </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
