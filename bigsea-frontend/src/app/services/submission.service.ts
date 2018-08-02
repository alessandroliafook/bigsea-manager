import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../config/api.config';

@Injectable()
export class SubmissionService {

    private url = apiConfig.apiUrl + '/submissions';

    constructor(private httpClient: HttpClient) { }

    /**
     * Run a submission and returns json data with id of submission.
     * @param submission {
     *  plugin: [string],
     *  plugin_info: { ... }
     * }
     * @returns <Observable> {
     *  id: [string]
     * }
     */
    submitAndRun(submission) {
        return this.httpClient.post(this.url, submission);
    }

    /**
     * Stop a running submission.
     * @param id : string
     * @returns <Observable> {}
     */
    stopSubmission(id) {
        const user = {};
        return this.httpClient.put(this.url + '/' + id + '/stop', user);
    }

    /**
     * List all submissions.
     * @returns <Observable> {
     *  submission1 : { status: [string] }
     *  ...
     *  submissionN : { status: [string]}
     * }
     */
    listSubmissions() {
        return this.httpClient.get(this.url);
    }

    /**
     * Returns json data with detailed status of submission.
     * @param id : string
     * @returns <Observable>{
     *  status : [string],
     *  execution_time : [string],
     *  start_time : [string]
     * }
     */
    submissionStatus(id) {
        return this.httpClient.get(this.url + '/' + id);
    }

    /**
     * Returns json data with log of submission.
     * @param id : string
     * @returns <Observable>{
     *  execution : [string],
     *  stderr : [string],
     *  stdout : [string]
     * }
     */
    submissionLog(id) {
        return this.httpClient.get(this.url + '/' + id + '/log');
    }

}
