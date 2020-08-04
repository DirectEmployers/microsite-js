import { isArray, get, kebabCase } from "lodash"
import { removeCountry } from '../../location'

export default class BaseJob{
    constructor(job) {
        this.job = job
    }

    getReqId() {
        return this.job.reqid
    }

    getTitle() {
        return this.job.title_exact
    }

    getDescription() {
        return this.job.description
    }

    getGuid(){
        return this.job.guid
    }

    getLocation(){
        return this.job.location_exact
    }

    getCustomAttribute(attribute) {
        const value = get(this.job, `customAttributes.${attribute}.stringValues`)

        return isArray(value) ? value.join(" ") : value
    }

    hasCommuteInfo() {
        return false
    }

    getCommuteTime() {
        return null
    }

    getDetailUrl(){

        const guid = this.getGuid()

        const locationSlug = kebabCase(removeCountry(this.getLocation()))

        const titleSlug = kebabCase(this.getTitle())

        return `/${locationSlug}/${titleSlug}/${guid}/job/`
    }

}