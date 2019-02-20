import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = [];
  filter: string = '';
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
  }

  load() {
    this.service.listFromUserPaginated(this.userName, ++this.pageNumber)
      .subscribe( photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false;
      });
  }
}
