import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://usparty-nine.vercel.app/login'
})