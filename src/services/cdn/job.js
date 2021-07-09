import cdn from "./cdn"

export function getJob(guid, s3Folder) {
    return cdn().get(`${s3Folder}/data/${guid.toUpperCase()}.json`)
}