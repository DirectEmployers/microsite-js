import BaseJob from './base';
import { blank } from '../../../helpers'
export default class GoogleTalentJob extends BaseJob{

    constructor(job) {
        super(job.job)
        this.commuteInfo = job.commuteInfo

    }

    getReqId(){
        return this.getCustomAttribute("reqid")
    }


    getGuid(){
        //the guid is stored as the "requistionId"
        //during imports to gurantee uniqueness.
        return this.job.requisitionId
    }

    getTitle(){
        return this.job.title
    }

    getLocation() {
        return this.getCustomAttribute("city_admin1_country")
    }

    getDescription(){
        return this.job.description
    }

    hasCommuteInfo() {
        if (blank(this.commuteInfo)) {
            return false
        }

        if (!Object.prototype.hasOwnProperty.call(this.commuteInfo, "travelDuration")) {
            return false
        }
        return true
    }

    getCommuteTime() {
        if (!this.hasCommuteInfo()) {
            return ""
        }

        const seconds = parseInt(
            this.commuteInfo.travelDuration.replace("s", "")
        )

        const hours = Math.floor(seconds / 60 / 60)

        const minutes = Math.floor(seconds / 60) - hours * 60

        return minutes
    }
}
