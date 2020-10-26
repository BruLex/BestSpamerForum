import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ModuleWithProviders } from '@angular/core';

import { ForumListComponent } from './forums-list/list/forum-list.component';
import { ForumPageComponent } from './forums-list/view/forum-page.component';
import { AppComponent } from './app.component';
import { MyPostsListComponent } from './my-posts/my-posts-list.component';
// import { Top5WPostsListComponent } from './top5-w-posts/top5-w-posts-list.component';
// import { Top25UsersListComponent } from './top25users/top25-users-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: () => redirectLoggedInTo(['dashboard']) }
    },
    {
        path: 'dashboard',
        component: AppComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'forum'
            },
            {
                path: 'forum',
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
                ]
            },
            {
                path: 'myposts',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: MyPostsListComponent
                    }
                ]
            }
            // {
            //     path: 'top25users',
            //     children: [
            //         {
            //             path: '',
            //             pathMatch: 'full',
            //             redirectTo: 'list'
            //         },
            //         {
            //             path: 'list',
            //             component: Top25UsersListComponent
            //         }
            //     ]
            // },
            // {
            //     path: 'top5wposts',
            //     children: [
            //         {
            //             path: '',
            //             pathMatch: 'full',
            //             redirectTo: 'list'
            //         },
            //         {
            //             path: 'list',
            //             component: Top5WPostsListComponent
            //         }
            //     ]
            // }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
export const ROUTING: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
