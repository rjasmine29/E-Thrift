import React, { useEffect, useRef, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import defaultProfileImg from "../../assets/default-profile.png";
import "./style.css";
import { postEditProfile } from "../../helpers/requests";

const EditProfile = ({
  setActiveFragment,
  email,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  phoneNumber,
  setPhoneNumber,
  avatarUrl,
  setAvatarUrl,
}) => {
  const [previewImg, setPreviewImg] = useState();
  const [avatarImg, setAvatarImg] = useState(defaultProfileImg);

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
  };

  /**
   * Clean up component after unmounting to avoid memory leaks.
   */
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  const submitEditProfile = async (e) => {
    try {
      if (isMounted) {
        e.preventDefault();
        let data = new FormData(e.target);

        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("username", username);
        data.append("phone_number", phoneNumber);

        if (e.target.image.files.length > 0) {
          data.append("avatar_url", e.target.image.files[0]);
        } else {
          data.append("avatar_url", null);
        }

        // make a request to edit the user
        await postEditProfile(data);
        console.log("edited profile with data: ", data);
      }
    } catch (err) {
      console.warn(`Error editing user: ${username}`);
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Register</h1>
      <form onSubmit={submitEditProfile} aria-label="form">
        <div className="profile-image-container">
          <CancelOutlinedIcon
            className="cancel-icon"
            aria-label="remove-image"
            onClick={removeSelectedImage}
          />
          <img
            className="profile-img"
            src={previewImg}
            alt="Profile"
            onClick={(e) => openFiles(e)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            aria-label="profile-input"
            name="image"
            hidden={true}
            onChange={(e) => onFileSelected(e)}
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
          Email
        </label>
        <input type="text" value={email} aria-label="email-input" disabled />

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
      <ArrowBackIcon onClick={setActiveFragment("")} />
    </div>
  );
};

export default EditProfile;
