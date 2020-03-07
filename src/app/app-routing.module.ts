import { RouterModule, Routes } from '@angular/router';
import { ForumListComponent } from './forums-list/list/forum-list.component';
import { ForumPageComponent } from './forums-list/view/forum-page.component';
import { ForumComponent } from './forums-list/forum.component';
import { AppComponent } from './app.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostsListComponent } from './my-posts/my-posts-list/my-posts-list.component';
import { Top25UsersComponent } from './top25users/top25-users.component';
import { Top5WPostsComponent } from './top5-w-posts/top5-w-posts.component';
import { Top5WPostsListComponent } from './top5-w-posts/top5-w-posts-list/top5-w-posts-list.component';
import { Top25UsersListComponent } from './top25users/top25-users-list/top25-users-list.component';
import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    children: [
      {
        path: 'forum',
        component: ForumComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: ForumListComponent
          },
          {
            path: ':id',
            component: ForumPageComponent
          }
        ],
      },
      {
        path: 'myposts',
        component: MyPostsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: MyPostsListComponent,
          }
        ]
      },
      {
        path: 'top25users',
        component: Top25UsersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: Top25UsersListComponent,
          }
        ]
      },
      {
        path: 'top5wposts',
        component: Top5WPostsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: Top5WPostsListComponent,
          }
        ],
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }];
export const ROUTING = RouterModule.forRoot(routes);
