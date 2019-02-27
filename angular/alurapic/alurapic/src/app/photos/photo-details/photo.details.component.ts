import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { PhotoComment } from './../photo/photo-comment';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photoId: number;
    photo$: Observable<Photo[]>;
    comments$: Observable<PhotoComment[]>;
    
    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router) {}
    
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;

        this.photo$ = this.photoService.findById(this.photoId);
        this.comments$ = this.photoService.getComments(this.photoId);
    }

    remove() {
        this.photoService.removePhoto(this.photoId)
        .subscribe(() => {
            alert('Foto deletada com sucesso!');
            this.router.navigate(['']);
        })
    }

}