import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoDetailsModule } from './photo-details/photo.details.module';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoDetailsModule
    ]
})
export class PhotosModule {}