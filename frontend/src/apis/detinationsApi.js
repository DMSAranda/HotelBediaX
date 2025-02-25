import axios from "axios";

const destinationsApi = axios.create({
   baseURL: `${import.meta.env.VITE_API_BACKEND}/api/destination`
})

export default destinationsApi;