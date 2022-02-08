const axios = require('axios');

async function postLogin(data) {
    try {
        const resp = await axios.post(`http://127.0.0.1:8000/user/login`, data);
        return resp;
    } catch (err) {
        console.warn(`Error requesting log in: ${err.response.data.detail}`);
    }
}

async function postRegister(data) {
    try {
        const resp = await axios.post("http://127.0.0.1:8000/user/register", data);
        if (resp.data.Error) {
            return resp.data.Error
        } else {
            return resp;
        }
    } catch (err) {
        console.warn(`Error requesting user registration: ${err.response.data.detail}`);
    }
}

async function getSearch(data, category){
    try {
        const resp = await axios.get(`http://127.0.0.1:8000/items/search/${data}/${category}/`);
        console.log(resp.data);
        const result = resp.json();
        return result;
    } catch (err) {
        console.warn(`Error retrieving search results for ${data}: ${err}`);
    }
}

async function getProfile(username) {
    try {
        const resp = await axios.get(`http://127.0.0.1:8000/user/${username}`);
        const user = resp.json();
        return user;
    } catch (err) {
        console.warn(`Error getting profile for ${username}: ${err}`);
    }
}

async function getRating(username) {
    try {
        const resp = await axios.get(`http://127.0.0.1:8000/user/rating/${username}`);
        const rating = resp.json();
        return rating;
    } catch (err) {
        console.warn(`Error getting rating for ${username}: ${err} `)
    }
}

async function getActiveItems(username) {
    try {
        const resp = await axios.get(`http://127.0.0.1:8000/items/get_by_username/${username}`);
        const items = resp.json();
        return items;
    } catch (err) {
        console.warn(`Error getting active items for ${username}: ${err}`);
    }
}

async function getClaimedItems(username) {
    try {
        const resp = await axios.get(`http://127.0.0.1:8000/items/get_by_username/claimed${username}`);
        const items = resp.json();
        return items;
    } catch (err) {
        console.warn(`Error getting claimed items for ${username}: ${err}`);
    }
}

export { postLogin, postRegister, getSearch, getProfile, getRating, getActiveItems, getClaimedItems }
