import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppBarComponent } from './app-bar/app-bar.component';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import { ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumListComponent } from './forums-list/list/forum-list.component';
import { ForumPageComponent } from './forums-list/view/forum-page.component';
import { ForumComponent } from './forums-list/forum.component';
import { RootComponent } from './root/root.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { Top5WPostsComponent } from './top5-w-posts/top5-w-posts.component';
import { Top25UsersComponent } from './top25users/top25-users.component';
import { MyPostsListComponent } from './my-posts/my-posts-list/my-posts-list.component';
import { Top25UsersListComponent } from './top25users/top25-users-list/top25-users-list.component';
import { Top5WPostsListComponent } from './top5-w-posts/top5-w-posts-list/top5-w-posts-list.component';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';

const ANGULAR_MATERIAL = [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
];

@NgModule({
    declarations: [
        AppComponent,
        AppBarComponent,
        ForumComponent,
        ForumListComponent,
        ForumPageComponent,
        RootComponent,
        MyPostsComponent,
        MyPostsListComponent,
        Top5WPostsComponent,
        Top5WPostsListComponent,
        Top25UsersComponent,
        Top25UsersListComponent,
        LoginComponent
    ],
    imports: [
        ROUTING,
        BrowserModule,
        BrowserAnimationsModule,
        ANGULAR_MATERIAL,
        MatFormFieldModule,
        HttpClientModule
    ],
    providers: [ApiService],
    bootstrap: [RootComponent]
})
export class AppModule {
}
