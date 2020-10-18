import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { PostItem } from '../list/forum-list.component';
import { EnvService } from '../../env.service';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './forum-page.component.html',
    styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit {
    post: PostItem;
    restrictedwords: { word: string }[];
    wordsRegExp: RegExp;

    constructor(
        private route: ActivatedRoute,
        private apiSrv: ApiService,
        private envSrv: EnvService,
        private appComp: AppComponent
    ) {
        this.apiSrv.get('restrictedwords').subscribe((resp: { word: string }[]) => {
            this.restrictedwords = resp;

            this.wordsRegExp = new RegExp(`${ resp.map(({ word }) => `\\b${ word }`).join('|') }`, 'g');
            console.log(this.wordsRegExp);
        });
    }

    ngOnInit() {
        this.route.paramMap.pipe(map(paramMap => {
            this.apiSrv.get('posts/' + paramMap.get('id')).subscribe(resp => {
                this.post = resp;
                this.post.comments.forEach(commentObj => {
                    commentObj.comment = commentObj.comment.replace(this.wordsRegExp, '****');
                });
            });
        })).subscribe();
    }

    upCarma(comment) {
        this.changeCarma(comment.i_comment, true);
    }

    downCarma(comment) {
        this.changeCarma(comment.i_comment, false);
    }

    isLiked(comment: any) {
        return comment.usersLiked.some(user => user.i_user === this.envSrv.user.i_user);
    }

    isDisliked(comment: any) {
        return comment.usersDisliked.some(user => user.i_user === this.envSrv.user.i_user);
    }

    sendComment(commentText) {
        this.apiSrv.post('add_comment/', { comment: commentText, i_post: this.post.i_post }).subscribe(() => {
            this.updatePost();
            this.appComp.updateStatusOfAccess();
        });

    }

    updatePost() {
        this.apiSrv.get('posts/' + this.post.i_post).subscribe(resp => {
            this.post = resp;
            this.post.comments.forEach(commentObj => {
                commentObj.comment = commentObj.comment.replace(this.wordsRegExp, '****');
            });
        });
    }

    private changeCarma(iComment: number, isLiked: boolean): void {
        this.apiSrv.post('change_rating/', { i_comment: iComment, liked: isLiked }).subscribe(() => {
            this.updatePost();
        });
    }
}
