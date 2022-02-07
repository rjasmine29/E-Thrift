import { getRatingUtilityClass } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../helpers/requests';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [avatarUrl, setAvatarUrl] = useState();

    const isMounted = useRef(true);
    const params = useParams();
    const currentUser = params.currentUser;

    useEffect(() => {
        if(isMounted) {
            const getProfileData = async () => {
                setIsLoading(true);
                setUsername(localStorage.getItem('username'));
                const user = await getProfile(username);
                const rating = await getRatingUtilityClass(username);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setPhoneNumber(user.phoneNumber);
                setAvatarUrl(user.avatarUrl);
                setIsLoading(false);
            }
            getProfileData();
        }
        return(() => {
            isMounted.current = false;
        })
    });
    return (
        <div className='profile-page'>
            {isLoading &&
                <div className='loading'>
                    ...loading
                </div>
            }
            {!isLoading && 
                <div className='profile-container'>
                    <div className='header'>
                        <h1>{username}</h1>
                    </div>
                    <div className="avatar-container">
                        <img src={avatarUrl} alt="Profile" className="avatar-img" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;