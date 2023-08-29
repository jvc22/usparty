import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://uspparty.netlify.app/api'
})