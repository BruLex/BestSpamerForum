import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

// TODO Refactor with Firebase
@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // notImplemented: boolean = this.envSrv.user?.i_user !== 1;
    // noAccessToCreate: boolean = true;

    @ViewChild(MatDrawer) drawer: MatDrawer;

    // TODO Refactor with Firebase
    updateStatusOfAccess(): void {}
}
