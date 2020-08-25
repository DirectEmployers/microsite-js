import BaseJob from './base';
import { blank } from '../../../helpers'
import { isArray, get, has } from "lodash"
import { removeState, removeCountry, fullState } from '../../location'

export default class GoogleTalentJob extends BaseJob{

    constructor(job) {
        super(job.job)
        this.commuteInfo = job.commuteInfo

    }

    getReqId(){
        return this.getAttribute("reqid")
    }


    getGuid(){
        //the guid is stored as the "requistionId"
        //during imports to gurantee uniqueness.
        return this.data.requisitionId
    }

    hasAttribute(attribute) {
        const customAttr = `customAttributes.${attribute}.stringValues`

        return has(this.data, customAttr)
    }

    getAttribute(attribute, defaultValue = null) {
        const customAttr = `customAttributes.${attribute}.stringValues`

        const value = get(this.data, customAttr, defaultValue)

        return isArray(value) ? value.join(" ") : value
    }

    getTitle(){
        return this.data.title
    }

    getLocation() {
        return removeCountry(this.getAttribute("city_admin1_country"))
    }

    getHtmlDescription(){
        return this.data.description
    }

    getCity(){
        let location = this.getLocation()

        return removeState(removeCountry(location))
    }

    getState(){
        let location = this.getLocation()

        location = location.split(",")

        return fullState(location[1])
    }

    getDeletedAt(){
        return null
    }

    getCompany(){
        return this.data.companyDisplayName
    }

    getCountry(){
        return this.getAttribute("country")
    }


    getDateAdded(){
        return this.data.postingCreateTime
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
