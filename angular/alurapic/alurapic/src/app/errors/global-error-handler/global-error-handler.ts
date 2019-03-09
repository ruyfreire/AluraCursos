import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log-service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(private injector: Injector) {}

    handleError(error: any): void {
        console.log("Passei pelo handler");

        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof LocationStrategy ? location.path() : '';

        const message = error.message ? error.message : error.toString();


        router.navigate(['/error']);
        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sF =>
                        sF.toString())
                    .join('\n');

            console.log(message);
            console.log(stackAsString);
            serverLogService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }).subscribe(
                    () => console.log('Log de erro enviado ao Servidor'),
                    err => {
                        console.log(err);
                        console.log('Erro ao enviado log de erro');
                    }
                )
            })
    }
}