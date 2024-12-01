import axios from 'axios';
// const REST_API_BASE_URL="http://localhost:3030";
const REST_API_BASE_URL="https://subscriber-registration-backend-1.onrender.com/";

export const createSubscriber = (data) => {
    return axios.post(`${REST_API_BASE_URL}/subscribers`, data);
}