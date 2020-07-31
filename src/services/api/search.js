import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: process.env.GRIDSOME_API_URL,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export class GoogleTalentSearchService {
    static async get(q, siteConfig) {
        try {
            const response = await completeTitles({
                    config: siteConfig,
                    data: {"q": q},
                })
            return response
        } catch (error) {
            return error
        }
    }
}



export class TitleCompleteService {
    static async get(q, siteConfig) {
        try {
            const response = await completeTitles({
                    config: siteConfig,
                    data: {"q": q},
                })
            return response
        } catch (error) {
            return error
        }
    }
}
