import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: "https://microsites.dejobs.org/",
        withCredentials: false,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
}