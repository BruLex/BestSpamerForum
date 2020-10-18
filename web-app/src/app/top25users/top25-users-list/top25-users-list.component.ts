import { Component } from '@angular/core';

import { ApiService } from '../../api.service';

@Component({
    templateUrl: './top25-users-list.component.html',
    styleUrls: ['./top25-users-list.component.scss']
})
export class Top25UsersListComponent {
    users: User[] = [];

    constructor(private apiSrv: ApiService) {
        this.getAllUsers();
    }

    getAllUsers() {
        this.apiSrv.get('users').subscribe(resp => {
            this.users = resp.sort((a, b) => b.carma - a.carma).splice(0, 25);
            console.log(this.users);
        });
    }
}
