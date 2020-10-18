import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AppComponent } from '../app.component';

@Component({
    selector: 'app-bar[user]',
    templateUrl: './app-bar.component.html'
})
export class AppBarComponent implements OnInit {
    drawer: MatDrawer;

    @Input() user: User;

    constructor(private appComponent: AppComponent) {}

    ngOnInit() {
        this.drawer = this.appComponent.drawer;
    }

    logout() {
        this.appComponent.logout();
    }
}
