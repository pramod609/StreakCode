import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://streak-code-beta.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

