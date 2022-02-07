import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { postLogin } from "../../helpers/requests";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /**
   * Requests an authorized log in. Sets local storage user variables
   * upon success and navigates to previous page user was on.
   */
  async function requestLogin(e) {
    e.preventDefault()
    try {
      // obtain access and refresh tokens
      const {data} = await postLogin({
        email,
        password,
      });
      const user = jwt_decode(data.access);
      localStorage.setItem('authTokens', JSON.stringify(data))
      localStorage.setItem("email", user.username);
      navigate(-1);
    } catch (err) {
      localStorage.clear()
      console.warn(`Error requesting login: ${err}`);
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={requestLogin}>
        <h1>Sign-in</h1>
        <label label="email" aria-label="email">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="email-input"
          required
        />
        <label label="password" aria-label="password" type="password">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="password-input"
          required
        />
        <input type="submit" id="login-btn" className="submit-btn" value="Sign In" />
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
    </div>
  );
};

export default Login;
