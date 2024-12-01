import axios from 'axios';

// Base URL for your backend
const REST_API_BASE_URL = "https://subscriber-registration-backend-1.onrender.com/api";

/**
 * Function to create a subscriber
 * @param {Object} data - Subscriber data to be sent to the backend
 * @returns {Promise} Axios POST request promise
 */
export const createSubscriber = (data) => {
    return axios.post(`${REST_API_BASE_URL}/subscribers`, data);
};
