import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../config/api.config';

@Injectable()
export class UserService {

    private url = apiConfig.apiUrl + '/users';

    constructor(private httpClient: HttpClient) { }

    /**
     * Insert a new authorized bigseaUser email into service.
     * @param user {
     *  username: string,
     *  password: string,
     *  email: string
     * }
     * @returns <Observable> {
     *  email: string
     * }
     */
    newUser(user) {
        return this.httpClient.post(this.url, user);
    }

    /**
     * Check if the bigseaUser email already authorized in the system.
     * @param id : string
     * @returns <Observable> {
     *  email: string
     * }
     */
    validateUser(email) {
        return this.httpClient.get(this.url + '/' + email);
    }

}
