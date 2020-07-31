
/**
 * Check if the given value is "blank".
 */
export function blank(value) {
    let isBlank = false

    if([undefined, null, NaN, ''].includes(value)){
        isBlank = true;
    }
    else if(typeof value === 'string' && value.trim().length === 0){
        isBlank = true;
    }
    else if(Array.isArray(value) && value.length == 0){
        isBlank = true;
    }
    else if(typeof value === 'object' && Object.keys(value).length === 0){
        isBlank = true;
    }

    return  isBlank
}
/**
 * Check if the given url is absolute.
 */
export function isAbsoluteUrl(href) {
   const absolute = /^https?:\/\//i

   return absolute.test(href)
}
