import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";


const Profile = () => {
    //states to use

    const [name, setName] = useState('');
    const [rating, setRating] = useState({});

    //check token to see if profile is urs or another persons

    //useEffect with fetch request from server for users info on page load
    useEffect(async ()=>{
        const {data} = await axios.get(get_user_info)
        setName(data.name)
        getRatings
    },[])

    const showListings = async () =>{
        const {data} = await axios.get() //find listings by username
        // redirect to show listings by username page
    }

    const getRatings = async () =>{
        const {data} = await axios.get(get_rating_by_username)
        setRating(data)
    }

    return (
        <div className='profile-page'>
            <h1>{name}</h1>
            <img href='' alt='profile-pic'/>
            <h2>{rating.average_rating}, {rating.total}</h2>
            <button>Settings</button>
            <button>Messages</button>
            <button onClick={showListings}>Active Listings</button>
        </div>
    )
}

export default Profile;