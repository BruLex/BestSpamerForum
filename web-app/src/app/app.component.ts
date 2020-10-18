import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { ApiService } from './api.service';
import { EnvService } from './env.service';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    notimplemented: boolean = this.envSrv.user.i_user !== 1;
    noAccessToCreate = true;

    @ViewChild(MatDrawer, { static: true }) drawer: MatDrawer;

    constructor(
        public envSrv: EnvService,
        private apiSrv: ApiService,
        private route: Router
    ) {
        this.updateStatusOfAccess();
    }

    ngOnInit() {
        console.log(this.drawer);
    }

    updateStatusOfAccess() {
        if (this.noAccessToCreate) {
            this.apiSrv.get('can_comment').subscribe(resp => this.noAccessToCreate = !resp.success);
        }
    }

    logout() {
        this.apiSrv.get('logout').subscribe();
        this.route.navigate(['/login']);
    }
}
