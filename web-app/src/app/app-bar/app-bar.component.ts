import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User } from 'firebase';

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html'
})
export class AppBarComponent {
    readonly user$: Observable<User> = this.auth.user;

    @Input() drawer: MatDrawer;

    constructor(private auth: AngularFireAuth, private router: Router) {}

    toggleMenu(): void {
        this.drawer.toggle();
    }

    logout(): void {
        this.auth.signOut().then(() => this.router.navigate(['/login']));
    }
}
