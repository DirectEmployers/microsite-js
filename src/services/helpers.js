import { kebabCase } from "lodash"
import { removeCountry } from "./location"

/**
 * Check if the given value is "blank".
 */
export function blank(value) {
    let isBlank = false

    if ([undefined, null, NaN, ""].includes(value)) {
        isBlank = true
    } else if (typeof value === "string" && value.trim().length === 0) {
        isBlank = true
    } else if (Array.isArray(value) && value.length == 0) {
        isBlank = true
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
        isBlank = true
    }

    return isBlank
}

/**
 * Run the given function and keep trying if it fails
 * until the max retries are exceeded and return a promise.
 */
export function retry(callback, args = [], max = 5, delay = 100) {
    return new Promise((resolve, reject) => {
        try {
            let result = callback(...args)
            return resolve(result)
        } catch (e) {
            if (max > 0) {
                setTimeout(function() {
                    return retry(callback, args, --max, delay * 2)
                        .then(resolve)
                        .catch(err => {
                            return reject(err)
                        })
                }, delay)
            } else {
                return reject(e)
            }
        }
    })
}

/** Return true if the env is dev. */
export function isDevelopment() {
    if (process.env.NODE_ENV == "development") {
        return true
    }
    return false
}

/**
 * Build a job detail url.
 */
export function buildJobDetailUrl(title, location, guid) {
    const locationSlug = kebabCase(removeCountry(location))

    const titleSlug = kebabCase(title)

    return `/${locationSlug}/${titleSlug}/${guid}/job/`
}


/**
 * Converts an object to query string recursively.
 */
export function toQueryString(obj, parentKey) {

    if(obj == null || typeof obj !== "object"){
        return "";
    }

    let keys = Object.keys(obj);

    if (keys.length == 0) {
        return "";
    }

    let key;
    let query;
    let i = 0;
    let value = "";
    let output = [];
    let pattern = /[!'()*]/g;

    keys.forEach(k=>{

        value = obj[k]

        key = k.toString().replace(/[!'()*]/g, escape);

        parentKey ? (key = parentKey + "[" + key + "]") : "";

         if (typeof value === "object" && value != null) {
                query = toQueryString(value, key);

                if(query){
                    output.push(query);
                }

        } else if(value != null) {
            output.push(
                key + "=" + value.toString().replace(pattern, escape)
            );
        }
    });


    return output.join("&");
}