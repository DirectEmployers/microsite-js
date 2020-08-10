import BaseJob from './base'

export default class SolrJob extends BaseJob {
    static KEY = "solr";

    constructor(job) {
        super(job)
    }
}
