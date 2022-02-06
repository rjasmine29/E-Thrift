import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css"
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
// import logo from './logo.svg';
import {Nav, Navbar} from 'react-bootstrap';



function NavBar() {
    return (
       
            <Navbar bg="black" variant="dark" expand="sm">
            <Navbar.Brand>
                {/* <img src={logo} witdth="40px" height="40px" />{''} */}
                 Logo</Navbar.Brand>
            
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/create-listing">Create Listing</Nav.Link>
                <Nav.Link href="register-page">Register</Nav.Link>
                <Nav.Link href="/login-page" > Login</Nav.Link>  
            </Nav>
            </Navbar.Collapse>


        {/* <nav className="navbar">
            <NavLink to="">Logo</NavLink>
             <NavLink to="/create">Create Listing</NavLink>
            <NavLink to= "/signup">Sign Up</NavLink>
            <NavLink to= "/login">Login </NavLink>
          </nav> */}
          
          </Navbar>
    );
}

export default NavBar;