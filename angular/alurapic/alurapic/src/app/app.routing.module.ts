import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo.details.component';

    const routes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
        },
        {
            path: 'home',
            loadChildren: './home/home.module#HomeModule'
        },
        {
            path: 'user/:userName',
            component: PhotoListComponent,
            resolve: {
                photos: PhotoListResolver
            },
            data: {
                title: 'Timeline'
            }
        },
        {
            path: 'p/add',
            component: PhotoFormComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Adicionar foto'
            }
        },
        {
            path: 'p/:photoId',
            component: PhotoDetailsComponent,
            data: {
                title: 'Foto detalhes'
            }
        },
        {
            path: 'not-found',
            component: NotFoundComponent,
            data: {
                title: 'Não envontrada'
            }
        },
        {
            path: '**',
            redirectTo: 'not-found'
        }
    ]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {}