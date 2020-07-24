import cdn from './cdn'

export function getJob(guid) {
    return cdn().get(`${guid.toUpperCase()}.json`)
}
