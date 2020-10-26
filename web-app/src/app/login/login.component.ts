import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

import { from } from 'rxjs';

import { auth, FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @ViewChild('loginInput') loginInput: ElementRef;
    @ViewChild('passInput') passInput: ElementRef;
    @ViewChild('newLoginInput') newLoginInput: ElementRef;
    @ViewChild('newPassInput') newPassInput: ElementRef;
    @ViewChild('newReEnterPassInput') newReEnterPassInput: ElementRef;

    constructor(private auth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router) {}

    login(): void {
        from(this.auth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe(
            val => {
                console.log(val);
                this.router.navigate(['/dashboard']);
            },
            (err: FirebaseError) => {
                this.snackBar.open(err.message, 'Close');
            }
        );
    }
}
