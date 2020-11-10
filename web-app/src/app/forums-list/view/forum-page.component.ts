import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import { first, map, mergeMap, shareReplay } from 'rxjs/operators';
import { combineLatest, Observable, of, Subscription } from 'rxjs';

import { User } from 'firebase';

import { BanWord, Comment, Post } from '../../types';

@Component({
    templateUrl: './forum-page.component.html',
    styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit, OnDestroy {
    post$: Observable<Post>;
    owner$: Observable<Partial<User>>;
    restrictedwords: { word: string }[];
    wordsRegExp: RegExp;

    private subs: Subscription[] = [];
    private itemsCollection: AngularFirestoreCollection<Post> = this.store.collection<Post>('posts');

    constructor(
        private route: ActivatedRoute,
        private store: AngularFirestore,
        private auth: AngularFireAuth,
        private afFunctions: AngularFireFunctions
    ) {
        this.post$ = this.route.paramMap.pipe(
            first(),
            mergeMap(
                (paramMap): Observable<Post> =>
                    this.itemsCollection
                        .valueChanges({
                            idField: 'i_post'
                        })
                        .pipe(
                            map((records): Post => records.find(({ i_post }): boolean => i_post === paramMap.get('id')))
                        )
            ),
            mergeMap(post => {
                const users: Set<string> = new Set(post.comments?.map(({ ownerUid }) => ownerUid));
                if (!users.size) {
                    return of(post);
                }
                return combineLatest(
                    Array.from(users.values()).map(uid => this.afFunctions.httpsCallable('getUser')({ uid }))
                ).pipe(
                    map(users => {
                        post.comments.forEach(comment => {
                            const user: User = users.find(v => v.uid === comment.ownerUid);
                            if (user) {
                                comment.owner = { displayName: user.displayName, photoURL: user.photoURL };
                            } else {
                                comment.owner = { displayName: 'Unknown', photoURL: '' };
                            }
                        });
                        return post;
                    })
                );
            })
        );

        this.owner$ = this.post$.pipe(
            mergeMap(
                ({ ownerUid }): Observable<Partial<User>> =>
                    this.afFunctions.httpsCallable('getUser')({ uid: ownerUid })
            ),
            shareReplay(1)
        );
    }

    ngOnInit(): void {
        this.subs.push(
            this.store
                .collection<BanWord>('ban_words')
                .valueChanges()
                .subscribe((resp: { word: string }[]): void => {
                    this.restrictedwords = resp;
                    this.wordsRegExp = new RegExp(`${resp.map(({ word }): string => `\\b${word}`).join('|')}`, 'g');
                })
        );
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub): void => sub.unsubscribe());
    }

    manageRating(post: Post, comment: Comment, operation: 'down' | 'up'): void {
        comment.rating ??= 0;
        comment.rating = comment.rating + (operation === 'up' ? 1 : -1);
        this.itemsCollection.doc(post.i_post).update(post);
    }

    isLiked(comment: Comment): any {
        return false;
    }

    isDisliked(comment: Comment): any {
        return false;
    }

    sendComment(post: Post, comment: string): void {
        this.auth.currentUser.then(user => {
            post.comments.push({
                rating: 0,
                ownerUid: user.uid,
                comment
            });
            this.itemsCollection.doc(post.i_post).update(post);
        });
    }
}
