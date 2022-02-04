const axios = require('axios');

async function postLogin(data) {
    try {
        const resp = await axios.post(`${process.env.DB_URL}login`, data);
        const tokenData = resp.json();
        if (tokenData.err) { throw Error(tokenData.err) }
        return tokenData;
    } catch (err) {
        console.warn(`Error requesting log in: ${err}`);
    }
}

async function postProfileImage(formData) {
    try {
        const resp = await axios.post(process.env.CLOUDINARY_URL, formData);
        console.log(resp);
    } catch (err) {
        console.warm(`Error posting profile image: ${err}`);
    }
}

export { postLogin, postProfileImage }