import React, { useState } from "react";
import defaultProfileImg from "../../../assets/default-profile.png";
import "./style.css";

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const [avatarImg, setAvatarImg] = useState(defaultProfileImg);

  const uploadImage = () => {
    console.log(avatarImg);
    const formData = new FormData();
    formData.append("file", avatarImg);
    formData.append("upload_preset", "xw4yr");
  };

  const submitRegister = () => {

  }

  return (
    <div className="register-page">
      <form onSubmit={submitRegister}>
        <input
          src={avatarImg}
          type="file"
          onChange={(e) => setAvatarImg(e.target.files[0])}
          className="profile-img"
          aria-label="profile-input"
          alt="Input Profile Image"
        />
        <label label="first-name" aria-label="first-name">
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label label="last-name" aria-label="last-name">
          Last name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label label="username" aria-label="username">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label label="email" aria-label="email">
          Email address
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label label="password" aria-label="password">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label label="password-confirm" aria-label="password-confirm">
          Confirm password
        </label>
        <input
          type="text"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <label label="phone-number" aria-label="phone-number">
          Phone number
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input type="submit" id="register-btn" className="submit-btn">
          Create your E-Thrift account
        </input>
      </form>
    </div>
  );
};

export default Register;
