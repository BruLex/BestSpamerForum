import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    user: User;

    constructor() {}

    getSID() {
        return localStorage.getItem('SID') || '';
    }

    setSID(SID: string) {
        localStorage.setItem('SID', SID);
    }

    getUser() {
        return localStorage.getItem('u');
    }

    setUser(user: User) {
        this.user = user;
        localStorage.setItem('u', user.i_user.toString());
    }
}
