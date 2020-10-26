import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FirebaseError } from 'firebase';

import { Post } from '../types';

@Component({
    templateUrl: './my-posts-list.component.html',
    styleUrls: ['./my-posts-list.component.scss']
})
export class MyPostsListComponent {
    readonly posts$: Observable<Post[]>;

    selectedPostsId: SelectionModel<string> = new SelectionModel<string>();

    dialogMode: 'add' | 'edit' = 'add';
    addEditForm: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        body: new FormControl('')
    });

    @ViewChild('addEditDlg') editDialogRef: TemplateRef<any>;
    private itemsCollection: AngularFirestoreCollection<Post> = this.store.collection<Post>('posts');

    constructor(
        private auth: AngularFireAuth,
        private store: AngularFirestore,
        private snackBar: MatSnackBar,
        private matDialog: MatDialog
    ) {
        this.posts$ = this.itemsCollection
            .valueChanges({ idField: 'i_post' })
            .pipe(
                switchMap(posts =>
                    this.auth.user.pipe(map(({ uid }) => posts.filter(({ ownerUid }) => ownerUid === uid)))
                )
            );
    }

    addPost(title: string, body: string): void {
        this.itemsCollection.add({ title, body });
    }

    addEditPost(post?: Post): void {
        if (!post) {
            this.addEditForm.reset();
            this.dialogMode = 'add';
        } else {
            this.addEditForm.setValue({ title: post.title, body: post.body });
            this.dialogMode = 'edit';
        }
        this.matDialog
            .open(this.editDialogRef)
            .afterClosed()
            .pipe(switchMap(result => this.auth.user.pipe(map(user => ({ result, ownerUid: user.uid })))))
            .subscribe(({ result, ownerUid }) => {
                if (!result) {
                    return;
                }
                if (this.dialogMode === 'add') {
                    this.itemsCollection
                        .add({ ownerUid, ...this.addEditForm.value })
                        .catch((err: FirebaseError) => this.snackBar.open(err.message, 'Close'));
                } else {
                    this.itemsCollection
                        .doc<Post>(post.i_post)
                        .update({ ...this.addEditForm.value })
                        .catch((err: FirebaseError) => this.snackBar.open(err.message, 'Close'));
                }
            });
    }

    deleteSelected(): void {
        this.selectedPostsId.selected.forEach(id => {
            this.itemsCollection
                .doc(id)
                .delete()
                .catch((err: FirebaseError) => this.snackBar.open(err.message, 'Close'));
        });
    }
}
