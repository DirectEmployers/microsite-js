import { get, kebabCase, has } from "lodash"
import { removeCountry, fullState } from "../../location"
import { removeEndOfLine } from "../../../helpers"

export default class BaseJob {

    constructor(job) {
        this.data = job
    }

    getReqId() {
        return this.data.reqid
    }

    getAttribute(attribute, defaultValue = null) {
        return get(this.data, attribute, defaultValue)
    }

    hasAttribute(attribute) {
        return has(this.data, attribute)
    }

    getTitle() {
        return this.data.title_exact
    }

    getDescription() {
        return this.data.description
    }

    getHtmlDescription() {
        return this.data.html_description
    }

    getCleanHtmlDescription() {
        return this.getHtmlDescription().replace(/(\r\n|\n|\r)/gm, "")
    }

    getGuid() {
        return this.data.guid
    }

    getLocation() {
        return this.data.location_exact
    }


    hasCommuteInfo() {
        return false
    }

    getCommuteTime() {
        return null
    }

    getCity() {
        return this.data.city_exact
    }

    getState() {
        return fullState(this.data.state_short_exact)
    }

    getCompany() {
        return this.data.company
    }

    getCountry() {
        return this.data.country
    }

    getDateAdded() {
        return this.data.date_added
    }

    getDeletedAt() {
        return this.data.deleted_at
    }

    getDetailUrl() {
        const guid = this.getGuid()

        const locationSlug = kebabCase(removeCountry(this.getLocation()))

        const titleSlug = kebabCase(this.getTitle())

        return `/${locationSlug}/${titleSlug}/${guid}/job/`
    }

    jsonLd() {
        return {
            "@context": "http://schema.org",
            "@type": "JobPosting",
            employmentType: "Paid Work",
            title: this.getTitle(),
            datePosted: this.getDateAdded(),
            description: this.getCompany(),
            identifier: {
                "@type": "PropertyValue",
                name: this.getCompany(),
                value: this.getReqId(),
            },
            hiringOrganization: {
                "@type": "Organization",
                name: this.getCompany(),
            },
            jobLocation: {
                "@type": "Place",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: this.getCity(),
                    addressRegion: this.getState(),
                    addressCountry: {
                        "@type": "Country",
                        name: this.getCountry(),
                    },
                },
            },
        }
    }
}
