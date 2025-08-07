import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://streakcode-z6gn.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

