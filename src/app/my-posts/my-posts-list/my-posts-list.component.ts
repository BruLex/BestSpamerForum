import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';

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
  templateUrl: './my-posts-list.component.html',
  styleUrls: ['./my-posts-list.component.scss']
})
export class MyPostsListComponent {
  posts: PostItem[] = [];

  listToRemove: PostItem[] = [];

  editedPost: PostItem;

  constructor(
    private apiSrv: ApiService,
    public dialog: MatDialog
  ) {
    this.fetchMPyosts();
  }

  fetchMPyosts() {
    this.apiSrv.get('myposts').subscribe(posts => {
      this.posts = posts.data;
      console.log(posts.data);
    });
  }

  changeCheck(post: PostItem, isChecked: boolean) {
    if (isChecked) {
      this.listToRemove.push(post);
    } else {
      this.listToRemove = this.listToRemove.filter(val => val.i_post !== post.i_post);
    }
  }

  addPost(title: string, body: string) {
    this.apiSrv.post('add_post', { title, body }).subscribe(() => {
      this.fetchMPyosts();
    });
  }

  updatePost(title: string, body: string) {
    this.apiSrv.post('update_post', { title, body, i_post: this.editedPost.i_post }).subscribe(() => {
      this.fetchMPyosts();
    });
  }
}
