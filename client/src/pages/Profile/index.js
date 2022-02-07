import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

import ClaimedIcon from '../../assets/claimed_icon.png';
import CurrentlyListedIcon from '../../assets/currently_listed_icon.png';
import EditIcon from '../../assets/edit_icon.svg.png';
import MessageIcon from '../../assets/message_icon.png';
import { getActiveItems, getClaimedItems, getProfile, getRating } from '../../helpers/requests';
import { ActiveListings, ClaimedItems, EditProfile, Messages } from '../../components';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingActiveItems, setIsLoadingActiveItems] = useState(false);
    const [isLoadingClaimedItems, setIsLoadingClaimedItems] = useState(false);
    const [isLoadingMessages, setIsloadingMessages] = useState(false);
    const [activeFragment, setActiveFragment] = useState('');
    const [activeItems, setActiveItems] = useState([]);
    const [claimedItems, setClaimedItems] = useState([]);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [bio, setBio] = useState();
    const [rating, setRating] = useState();
    const [ratingCount, setRatingCount] = useState();

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
                setRating(fetchedRating.rating);
                setRatingCount(fetchedRating.count);
                setIsLoading(false);
            }
            getProfileData();
        }
        return(() => {
            isMounted.current = false;
        })
    });

    useEffect(() => {
        if (isMounted) {
            const fetchFragmentData = async () => {
                switch (activeFragment) {
                    case 'active':
                        setIsLoadingActiveItems(true);
                        const activeItems = await getActiveItems(username);
                        setActiveItems(activeItems);
                        setIsLoadingActiveItems(false);
                        return;
                    case 'claimed':
                        setIsLoadingClaimedItems(true);
                        const claimedItems = await getClaimedItems(username);
                        setClaimedItems(claimedItems);
                        setIsLoadingClaimedItems(false);
                        return;
                    case 'messages':
                        setIsloadingMessages(true);
                        // TODO: messages
                        // const messages = await getMessages(username)
                        setIsloadingMessages(false);
                        return;
                    default:
                        return;
                }
            }
            fetchFragmentData();
        }
    }, [activeFragment, username])
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
                        <span>{ratingCount}</span>
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
                <Messages 
                    isLoading={isLoadingMessages}
                    messages={messages}
                />
            }
            {activeFragment === 'active' &&
                <ActiveListings 
                    isLoading={isLoadingActiveItems} 
                    activeItems={activeItems}
                />
            }
            {activeFragment === 'claimed' &&
                <ClaimedItems 
                    isLoading={isLoadingClaimedItems} 
                    claimedItems={claimedItems}
                />
            }
            {activeFragment === 'edit' &&
                <EditProfile 
                    firstName={firstName} 
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    username={username}
                    setUsername={setUsername}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    avatarUrl={avatarUrl}
                    setAvatarUrl={setAvatarUrl}
                    bio={bio}
                    setBio={setBio}
                />
            }
        </div>
    )
}

export default Profile;