import axios from 'axios';
// const REST_API_BASE_URL="http://localhost:3030";

export const createSubscriber = (data) => {
    return axios.post(`${REST_API_BASE_URL}/subscriber`, data);
}