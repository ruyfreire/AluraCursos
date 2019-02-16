import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe({name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {
    
    transform(photos: Photo[], description: string) {
        description = description.trim().toLocaleLowerCase();

        if(description){
            return photos.filter(photo =>
                photo.description.toLocaleLowerCase().includes(description));
        } else {
            return photos;
        }
    }
}