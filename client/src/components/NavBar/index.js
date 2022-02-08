import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { postLogOut } from "../../helpers/requests";
import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, Navbar} from 'react-bootstrap';

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
    <Navbar expand="lg" bg="dark" variant="dark">
      
      <Nav.Link as={NavLink}  to="">Logo</Nav.Link>
      {username !== null && (
        <>
          <Nav.Link  as={NavLink} to="/create">Create Listing</Nav.Link>
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
          <Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>
          <Nav.Link as={NavLink} to="/login">Login </Nav.Link>
        </>
      )}
    </Navbar>
  );
}

export default NavBar;
