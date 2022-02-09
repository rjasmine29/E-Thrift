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
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [rating, setRating] = useState();
    const [ratingCount, setRatingCount] = useState();
    const [email, setEmail] = useState()

    const isMounted = useRef(true);
    const params = useParams();
    const currentUser = params.currentUser;
    useEffect(() => {
        console.log(`page load`)
        isMounted.current = true;

        if(isMounted) {
            const getProfileData = async () => {
                if(typeof window !== 'undefined'){
                    const name = localStorage.getItem('username')

                    setIsLoading(true);
                    setEmail(localStorage.getItem('email'));
                    const user = await getProfile(name);
                    const fetchedRating = await getRating(name);
                    console.log(user)
                    setFirstName(user.first_name);
                    setLastName(user.last_name);
                    setPhoneNumber(user.phone_number);
                    setAvatarUrl(user.avatar_url);
                    setRating(fetchedRating.average_rating);
                    setRatingCount(fetchedRating.total);
                    setIsLoading(false);
                }
            }
                getProfileData();
        }
            return(() => {
            isMounted.current = false;
        })
    },[]);

    useEffect(() => {
        isMounted.current = true;
        console.log(`changes active fragment. ${activeFragment}`)
        if (isMounted) {
            const fetchFragmentData = async () => {
                if(typeof window !== 'undefined'){
                    const name = localStorage.getItem('username')
                    switch (activeFragment) {
                        case '':
                            return;
                        case 'active':
                            setIsLoadingActiveItems(true);
                            const activeItems = await getActiveItems(name);
                            setActiveItems(activeItems);
                            setIsLoadingActiveItems(false);
                            return;
                        case 'claimed':
                            setIsLoadingClaimedItems(true);
                            const claimedItems = await getClaimedItems(name);
                            setClaimedItems(claimedItems);
                            setIsLoadingClaimedItems(false);
                            return;
                        // case 'messages':
                        //     setIsloadingMessages(true);
                        //     // TODO: messages
                        //     // const messages = await getMessages(username)
                        //     setIsloadingMessages(false);
                        //     return;
                        default:
                            return;
                    }
            }
        }
        fetchFragmentData();

        return(() => { isMounted.current = false });
    }}, [activeFragment])

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
                        <Rating ratingValue={rating * 20} readonly />
                        <span>{ratingCount}</span>
                    </div>

                    <div className="profile-options">
                        {/* <div className="options-container" onClick={() => setActiveFragment('messages')}>
                            <img src={MessageIcon} alt='Messages'/>
                            <span>Messages</span>
                        </div> */}
                        <div className="options-container">
                            <img src={CurrentlyListedIcon} alt='Active listings' onClick={() => setActiveFragment('active')}/>
                            <span>Active Listings</span>
                        </div>
                    </div>
                    {currentUser === 'true' &&
                        <div className="your-profile-options">
                            <div className="options-container" onClick={() => setActiveFragment('claimed')}>
                                <img src={ClaimedIcon} alt='Claimed items'/>
                                <span>Claimed Items</span>
                            </div>
                            <div className="options-container" onClick={() => setActiveFragment('edit')}>
                                <img src={EditIcon} alt='Edit profile'/>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    }
                </div>
            }
            {/* {activeFragment === 'messages' &&
                <Messages 
                    isLoading={isLoadingMessages}
                    setActiveFragment={setActiveFragment}
                    messages={messages}
                />
            } */}
            {activeFragment === 'active' &&
                <ActiveListings 
                    isLoading={isLoadingActiveItems} 
                    setActiveFragment={setActiveFragment}
                    activeItems={activeItems}
                />
            }
            {activeFragment === 'claimed' &&
                <ClaimedItems 
                    isLoading={isLoadingClaimedItems}
                    setActiveFragment={setActiveFragment}
                    claimedItems={claimedItems}
                />
            }
            {activeFragment === 'edit' &&
                <EditProfile 
                    setActiveFragment={setActiveFragment}
                    email={email}
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
                />
            }
        </div>
    )
}

export default Profile;