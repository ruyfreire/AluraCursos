import { Input, Component } from '@angular/core';

@Component({
    selector: 'ap-vmessage',
    templateUrl: './vmessage.component.html'
})
export class VMessageComponent {

    @Input() text;
}