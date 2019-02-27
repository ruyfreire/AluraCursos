import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownerPhoto: Photo;
    
    constructor(
        private element: ElementRef,
        private renderer: Renderer,
        private userService: UserService) {}
        
    ngOnInit(): void {
        this.userService.getUser()
            .subscribe(user => {
                if(!user || user.id != this.ownerPhoto.userId)
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            });
    } 
}