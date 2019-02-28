import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestInterceptor } from "./auth/request.interceptor";
import { FooterComponent } from './footer/footer.component';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { AlertModule } from '../shared/components/alert/alert.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DarkenOnHoverModule,
        AlertModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {}