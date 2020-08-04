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
export function retry(callback, max = 5, delay = 100) {
    return new Promise((resolve, reject) => {
        try {
            let result = callback()

            return resolve(result)
        } catch (e) {
            if (max > 0) {
                setTimeout(function () {
                    return retry(callback, --max, delay * 2)
                        .then(resolve)
                        .catch((err) => {
                            return reject(err)
                        })
                }, delay)
            } else {
                return reject(e)
            }
        }
    })
}
