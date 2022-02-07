import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { postRegister, postLogin } from "../../helpers/requests";
import defaultProfileImg from "../../assets/default-profile.png"
import "./style.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarImg, setAvatarImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultProfileImg);

  const navigate = useNavigate();
  const fileInputRef = useRef();
  const isMounted = useRef(true);

  /**
   * Opens the file explorer to select an image.
   * Triggers the fileInput element using a reference of it with useRef.
   * 
   * @param {Click event belonging to element calling the method} e 
   */
  const openFiles = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  /**
   * Processes the selected file, asserting that it is a suitable image
   * and then sets the avatarImg state accordingly.
   * 
   * @param {Change event for when an image is selected by the fileInput} e 
   */
  const onFileSelected = (e) => {
    const file = e.target.files[0];
    // assert that selected file is an image
    if (file && file.type.substr(0, 5) === "image") {
      setAvatarImg(file);
    } else {
      // sets the avatarImg to null if no image is chosen
      setAvatarImg(null);
    }
  };

  const removeSelectedImage = (e) => {
    if (avatarImg !== null) {
      setAvatarImg(null);
      setPreviewImg(defaultProfileImg);
    }
  }

  /**
   * Submits the form data to request user registration.
   * Logs in the user and redirects them to the
   * home page upon successful registration.
   *
   * @param {Submit event that is fired upon submission of the form} e
   */
  const submitRegister = async (e) => {
    try {
      if (isMounted) {
        e.preventDefault();
        let data = new FormData(e.target)

        data.append('first_name', firstName)
        data.append('last_name', lastName)
        data.append('username', username)
        data.append('email', email)
        data.append('password', password)
        data.append('password_confirmation', passwordConfirm)
        data.append('phone_number', phoneNumber)
        data.append('avatar_url', e.target.image.files[0])
        
        // register the user
        let output = await postRegister(data);
        
        if (output != "Error registering!") {
          // log the user in upon successful register
          await requestLogin();
        }
      }
    } catch (err) {
      console.warn(`Error registering user: ${err}`);
    }
  };

  /**
   * Requests an authorized log in. Sets local storage user variables
   * upon success and navigates to the home page.
   */
  async function requestLogin() {
    try {
      if(isMounted) {
        // obtain access and refresh tokens
        const { accessToken, refreshToken } = await postLogin({
          email,
          password,
        });
        const user = jwt_decode(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("email", user.username);
        navigate("/");
      }
    } catch (err) {
      console.warn(`Error requesting login: ${err}`);
    }
  }

  /**
   * Sets the preview image whenever the selected image (avatarImg)
   * is changed by the user.
   */
  useEffect(() => {
    if (avatarImg && avatarImg !== defaultProfileImg && isMounted) {
      const reader = new FileReader();
      // set the preview image once avatarImg url has been read
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(avatarImg);
    } else {
      setPreviewImg(defaultProfileImg);
    }
  }, [avatarImg]);

  /**
   * Clean up component after unmounting to avoid memory leaks.
   */
  useEffect(() => {
    return () => { isMounted.current = false }
  })

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={submitRegister} aria-label="form">
        <div className="profile-image-container">
          <CancelOutlinedIcon className="cancel-icon" aria-label="remove-image" onClick={removeSelectedImage} />
          <img className="profile-img" src={previewImg} alt="Profile" onClick={e => openFiles(e)} />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            aria-label="profile-input"
            name="image"
            hidden={true}
            onChange={e => onFileSelected(e)}
          />
        </div>

        <label label="first-name" aria-label="first-name">
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-label="first-name-input"
          required
        />

        <label label="last-name" aria-label="last-name">
          Last name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          aria-label="last-name-input"
          required
        />

        <label label="username" aria-label="username">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="username-input"
          required
        />

        <label label="email" aria-label="email">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="email-input"
          required
        />

        <label label="password" aria-label="password">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="password-input"
          required
        />

        <label label="password-confirm" aria-label="password-confirm">
          Confirm password
        </label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          aria-label="password-confirm-input"
          required
        />

        <label label="phone-number" aria-label="phone-number">
          Phone number
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          aria-label="phone-number-input"
          required
        />

        <input
          type="submit"
          id="register-btn"
          className="submit-btn"
          input="Create your E-Thrift account"
        />
      </form>
    </div>
  );
};

export default Register;
