import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { FirebaseOptions } from '@angular/fire/firebase.app.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppBarComponent } from './app-bar/app-bar.component';
import { ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumListComponent } from './forums-list/list/forum-list.component';
import { ForumPageComponent } from './forums-list/view/forum-page.component';
import { RootComponent } from './root/root.component';
import { MyPostsListComponent } from './my-posts/my-posts-list.component';
// import { Top25UsersListComponent } from './top25users/top25-users-list.component';
// import { Top5WPostsListComponent } from './top5-w-posts/top5-w-posts-list.component';
import { LoginComponent } from './login/login.component';

export const firebase: FirebaseOptions = {
    apiKey: 'AIzaSyCyY7KPhy_av_Aw8kA7K7UzQCHZSazEOgU',
    authDomain: 'civic-access-292812.firebaseapp.com',
    databaseURL: 'https://civic-access-292812.firebaseapp.com',
    projectId: 'civic-access-292812',
    storageBucket: 'civic-access-292812.appspot.com',
    messagingSenderId: '382237606582'
};

@NgModule({
    declarations: [
        AppComponent,
        AppBarComponent,
        ForumListComponent,
        ForumPageComponent,
        RootComponent,
        MyPostsListComponent,
        // Top5WPostsListComponent,
        // Top25UsersListComponent,
        LoginComponent
    ],
    imports: [
        ROUTING,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        ScrollingModule,

        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,

        AngularFireModule.initializeApp(firebase),
        AngularFireAuthGuardModule,
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }],
    bootstrap: [RootComponent]
})
export class AppModule {}
