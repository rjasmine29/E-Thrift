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

export { postLogin, postRegister }