import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from 'rxjs';

import { PhotoService } from './../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit { 

    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>
    commentForm: FormGroup;
    logged: boolean = false;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder,
        private userService: UserService){}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });

        this.logged = this.userService.isLogged();
    }

    save() {
        const commentText = this.commentForm.get('comment').value as string;

        this.comments$ = this.photoService.addComments(this.photoId, commentText)
            .pipe(
                switchMap(() => this.photoService.getComments(this.photoId))
            ).pipe(
                tap(() => this.commentForm.reset())
            );
    }
}