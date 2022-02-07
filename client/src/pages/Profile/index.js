import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

import ClaimedIcon from '../../assets/claimed_icon.png';
import CurrentlyListedIcon from '../../assets/currently_listed_icon.png';
import EditIcon from '../../assets/edit_icon.svg.png';
import MessageIcon from '../../assets/message_icon.png';
import { getProfile, getRating } from '../../helpers/requests';
import { ActiveListings, ClaimedItems, EditProfile, Messages } from '../../components';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeFragment, setActiveFragment] = useState('');
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [bio, setBio] = useState();
    const [rating, setRating] = useState();

    const isMounted = useRef(true);
    const params = useParams();
    const currentUser = params.currentUser;

    useEffect(() => {
        if(isMounted) {
            const getProfileData = async () => {
                setIsLoading(true);
                setUsername(localStorage.getItem('username'));
                const user = await getProfile(username);
                const fetchedRating = await getRating(username);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setPhoneNumber(user.phoneNumber);
                setAvatarUrl(user.avatarUrl);
                setBio(user.bio);
                setRating(fetchedRating);
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
            {!isLoading && activeFragment === '' &&
                <div className='profile-container'>
                    <div className='header'>
                        <h1>{username}</h1>
                    </div>
                    <div className="avatar-container">
                        <img src={avatarUrl} alt="Profile" className="avatar-img" />
                        <Rating ratingValue={rating} />
                    </div>
                    <div className="bio-container">
                        <p>{bio}</p>
                    </div>

                    <div className="profile-options">
                        <div className="options-container" onClick={setActiveFragment('messages')}>
                            <img src={MessageIcon} alt='Messages'/>
                            <span>Messages</span>
                        </div>
                        <div className="options-container">
                            <img src={CurrentlyListedIcon} alt='Active listings' onClick={setActiveFragment('active')}/>
                            <span>Active Listings</span>
                        </div>
                    </div>
                    {currentUser === 'true' &&
                        <div className="your-profile-options">
                            <div className="options-container" onClick={setActiveFragment('claimed')}>
                                <img src={ClaimedIcon} alt='Claimed items'/>
                                <span>Claimed Items</span>
                            </div>
                            <div className="options-container" onClick={(setActiveFragment('edit'))}>
                                <img src={EditIcon} alt='Edit profile'/>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    }
                </div>
            }
            {activeFragment === 'messages' &&
                <Messages />
            }
            {activeFragment === 'active' &&
                <ActiveListings />
            }
            {activeFragment === 'claimed' &&
                <ClaimedItems />
            }
            {activeFragment === 'edit' &&
                <EditProfile />
            }
        </div>
    )
}

export default Profile;