import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: process.env.GRIDSOME_CDN_URL,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}