const axios = require('axios');

async function postLogin(data) {
    try {
        const resp = await axios.post(`http://localhost/login`, data);
        const tokenData = resp.json();
        if (tokenData.err) { throw Error(tokenData.err) }
        return tokenData;
    } catch (err) {
        console.warn(`Error requesting log in: ${err}`);
    }
}

async function postRegister(data) {
    try {
        const resp = await axios.post("http://localhost/register", data);
        const newUser = resp.json();
        return newUser;
    } catch (err) {
        console.warn(`Error requesting user registration: ${err}`);
    }
}

async function getProfile(username) {
    try {
        const resp = await axios.get(`http://localhost/users/${username}`);
        const user = resp.json();
        return user;
    } catch (err) {
        console.warn(`Error getting profile for ${username}: ${err}`);
    }
}

async function getRating(username) {
    try {
        const resp = await axios.get(`http://localhost/ratings/${username}`);
        const rating = resp.json();
        return rating;
    } catch (err) {
        console.warn(`Error getting rating for ${username}: ${err} `)
    }
}

export { postLogin, postRegister, getProfile, getRating }