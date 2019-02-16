import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  userName: string = '';
  pageNumber: number = 1;
  
  constructor(
    private activatedRoutes: ActivatedRoute,
    private service: PhotoService
  ) { }
  
  ngOnInit(): void {
    this.userName = this.activatedRoutes.snapshot.params.userName;
    this.photos = this.activatedRoutes.snapshot.data.photos;
    
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this.service.listFromUserPaginated(this.userName, ++this.pageNumber)
      .subscribe( photos => {
        if(photos.length)
          this.photos = this.photos.concat(photos);
        else 
          this.hasMore = false;
      });
  }
}
