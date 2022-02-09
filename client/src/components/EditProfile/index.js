import React, { useEffect, useRef, useState } from "react";
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
  const [avatarImg, setAvatarImg] = useState(null);

  const isMounted = useRef(true);
  const fileInputRef = useRef();
  const currentImg = useRef(avatarUrl); // the user's current img

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
    }
  };

  const removeCurrentImage = (e) => {
    e.preventDefault();
    if (avatarImg !== null) {
      setAvatarImg(null);
      fileInputRef.current.value = "";
    } else if (currentImg.current.includes("cloudinary")) {
      setAvatarUrl(defaultProfileImg);
      fileInputRef.current.value = "";
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

  /**
   * Sets the preview image whenever the selected image (avatarImg)
   * is changed by the user.
   */
  useEffect(() => {
    if (avatarImg && avatarImg !== null && isMounted) {
      const reader = new FileReader();
      // set the preview image once avatarImg url has been read
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        currentImg.current = "changed";
      };
      reader.readAsDataURL(avatarImg);
    } else if (!currentImg.current.includes("cloudinary")) {
      setAvatarUrl(defaultProfileImg);
    }
  }, [avatarImg, setAvatarUrl]);

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
      <div className="edit-profile-header">
        <ArrowBackIcon
          className="go-back-btn"
          onClick={() => setActiveFragment("")}
        />
        <h2>Edit Profile</h2>
      </div>

      <form onSubmit={submitEditProfile} aria-label="form">
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label label="email" aria-label="email">
            Email
          </label>
          <input type="email" value={email} aria-label="email-input" disabled />
        </div>
        <div>
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
        </div>
        <div className="change-image-container">
          <button
            aria-label='remove-img-btn'
            className="remove-profile-btn"
            onClick={removeCurrentImage}
            disabled={avatarUrl === defaultProfileImg}
          >
            Remove Current Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            aria-label="profile-input"
            name="image"
            onChange={(e) => onFileSelected(e)}
          />
        </div>
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

export default EditProfile;
