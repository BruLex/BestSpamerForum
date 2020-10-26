import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Post } from '../../types';

@Component({
    templateUrl: './forum-list.component.html',
    styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent {
    readonly posts$: Observable<Post[]>;
    private itemsCollection: AngularFirestoreCollection<Post> = this.store.collection<Post>('posts');

    constructor(private store: AngularFirestore) {
        this.posts$ = this.itemsCollection.valueChanges({ idField: 'i_post' });
    }
}
