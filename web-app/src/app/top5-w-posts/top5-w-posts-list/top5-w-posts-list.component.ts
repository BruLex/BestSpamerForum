import { Component } from '@angular/core';
import { PostItem } from '../../forums-list/list/forum-list.component';
import { ApiService } from '../../api.service';


@Component({
    templateUrl: './top5-w-posts-list.component.html',
    styleUrls: ['./top5-w-posts-list.component.scss']
})
export class Top5WPostsListComponent {

    posts: PostItem[] = [];

    constructor(private apiSrv: ApiService) {
        this.getAllForums();
    }

    getAllForums() {
        this.apiSrv.get('posts').subscribe(resp => {
            this.posts = resp.sort((a, b) => b.comments.length - a.comments.length).splice(0, 5);
        });
    }

}
