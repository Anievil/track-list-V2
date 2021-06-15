import axios from 'axios';
import CONSTANTS from '../constants';
require('dotenv').config()
const URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:9633/'
console.log(process.env);
const instance = axios.create({
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin': URL,
        'Accept': '*/*',
    }
});

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (token) {
        config.headers = {...config.headers, 'Authorization': token};
    }
    return config;
}, (err) => Promise.reject(err)); 



instance.interceptors.response.use(response => {
    if (response.data.token) {
        console.log(response.data.token)
        console.log(response.data.userData)
        window.localStorage.setItem('userData', JSON.stringify(response.data.userData));
        window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
}, err => {
    return Promise.reject(err);
});

export default instance;
