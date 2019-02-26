import { Directive, OnInit, ElementRef } from '@angular/core';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Directive({
    selector: '[apImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef,
        private plataformDetector: PlataformDetectorService
    ) {}

    ngOnInit() {
        this.plataformDetector.isPlatformBrowser &&
        this.element.nativeElement.click();
    }
}