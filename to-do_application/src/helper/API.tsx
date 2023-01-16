import axios from 'axios';


const API = axios.create({
    baseURL: `${import.meta.env.VITE_LOCAL_API}/`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 120000,
});

export default API;