import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../config/api.config';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BigseaUser } from '../model/bigsea-user.model';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class SessionService {

    private url = apiConfig.apiUrl + '/users';

    constructor(
        private httpClient: HttpClient,
        private socialAuth: AuthService,
        private router: Router
    ) { }

    signIn() {
        this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            user => {
                const authUser = new BigseaUser(user.email, user.name, user.photoUrl);
                localStorage.setItem('bigseaUser', JSON.stringify(authUser));
                this.router.navigate(['/submissions']);
            }
        );
    }

    signOut() {
        localStorage.removeItem('bigseaUser');
        this.socialAuth.signOut();
    }

    recoveryUserFromStorage() {
        const user: BigseaUser = JSON.parse(localStorage.getItem('bigseaUser'));
        return user;
    }

    isSignedIn() {
        return localStorage.getItem('bigseaUser') !== null;
    }

}
