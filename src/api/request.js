import axios from "axios"

const req = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    timeout: "20000",
    withCredentials: true
})

export default req