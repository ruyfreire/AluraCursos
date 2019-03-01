import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { PhotoComment } from './../photo/photo-comment';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

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
        private router: Router,
        private alertService: AlertService,
        private userService: UserService) {}
    
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;

        this.photo$ = this.photoService.findById(this.photoId);
        this.comments$ = this.photoService.getComments(this.photoId);

        this.photo$.subscribe(()=>{}, err => {
            this.router.navigate(['not-found']);
        });
    }

    remove() {
        this.photoService.removePhoto(this.photoId)
        .subscribe(() => {
            this.alertService.success('Foto removida com sucesso', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
        },
        err => {
            this.alertService.warning('Erro ao tentar remover a foto');
            console.log(err);
        });
    }

}