import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

export interface User {
    i_user?: number;
    name: string;
    iconImg?: string;
}

export interface PostItem {
    user: User;
    i_post: number;
    title: string;
    body: string;
    comments: any[];
}

@Component({
    templateUrl: './forum-list.component.html',
    styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent {
    posts: PostItem[] = [];

    constructor(private apiSrv: ApiService) {
        this.getAllForums();
    }

    getAllForums() {
        this.apiSrv.get('posts').subscribe(posts => {
            this.posts = posts;
        });
    }

}
