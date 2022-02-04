import React from "react";
import { NavLink } from "react-router-dom";


function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="">Logo</NavLink>
            <NavLink to="/create">Create Listing</NavLink>
            <NavLink to= "/signup">Sign Up</NavLink>
            <NavLink to= "/login">Login </NavLink>
         </nav>
    );
}

export default NavBar;