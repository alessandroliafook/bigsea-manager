export class BigseaUser {
    email: string;
    name: string;
    photoUrl: string;

    constructor(email: string, name: string, photoUrl: string) {
        this.email = email;
        this.name = name;
        this.photoUrl = photoUrl;
    }
}
