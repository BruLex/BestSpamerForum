import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { EnvService } from '../env.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    stepIndex = 0;

    @ViewChild('loginInput', { static: false }) loginInput: ElementRef;
    @ViewChild('passInput', { static: false }) passInput: ElementRef;
    @ViewChild('newLoginInput', { static: false }) newLoginInput: ElementRef;
    @ViewChild('newPassInput', { static: false }) newPassInput: ElementRef;
    @ViewChild('newReEnterPassInput', { static: false }) newReEnterPassInput: ElementRef;

    constructor(
        private snackBar: MatSnackBar,
        private apiSrv: ApiService,
        private envSrv: EnvService,
        private router: Router
    ) {
    }

    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action || 'Close', {
            duration: 3000
        });
    }

    createUser() {
        const login: string = this.newLoginInput.nativeElement.value;
        const password: string = this.newPassInput.nativeElement.value;
        const rePassword: string = this.newReEnterPassInput.nativeElement.value;
        console.log(login, password, rePassword);
        if (!login || !password || !rePassword) {
            this.openSnackBar('Please fill login and passwords fields');
            return;
        }
        if (password !== rePassword) {
            this.openSnackBar('Passwords must be the same');
            return;
        }
        this.apiSrv.post('create_user', { login, password }).subscribe(
            resp => {
                if (resp.success) {
                    this.openSnackBar('User created successfully');
                    this.newLoginInput.nativeElement.value =
                        this.newPassInput.nativeElement.value =
                            this.newReEnterPassInput.nativeElement.value = '';
                    this.stepIndex = 0;
                } else {
                    this.openSnackBar('User creation failed');
                }
            },
            resp => this.openSnackBar('User creation failed: ' + resp.error.message || '')
        );
    }

    login() {
        const login: string = this.loginInput.nativeElement.value;
        const password: string = this.passInput.nativeElement.value;
        if (!login || !password) {
            this.openSnackBar('Please fill login and password fields');
            return;
        }
        this.apiSrv.post('login', { login, password }).subscribe(resp => {
                if (resp.success) {
                    this.openSnackBar('Success, SID: ' + resp.data.session_id);
                    this.envSrv.setSID(resp.data.session_id);
                    this.router.navigate(['/']);
                } else {
                    this.openSnackBar('Login failed' + resp.data || '');
                }
            }
        );
    }
}
