// import config from "~/config"
import { completeTitles } from "./jobs"

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
