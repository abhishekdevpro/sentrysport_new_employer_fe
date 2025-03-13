import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://api.sentryspot.co.uk/api",
    // withCredentials:true
})

export default axiosInstance