import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoDetailsComponent } from './photo.details.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [
        PhotoDetailsComponent
    ],
    exports: [
        PhotoDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PhotoModule
    ]
})
export class PhotoDetailsModule { }