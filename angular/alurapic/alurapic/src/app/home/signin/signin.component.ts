import { isPlatformBrowser } from '@angular/common';
import { PlataformDetectorService } from './../../core/plataform-detector/plataform-detector.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    paraURL: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private plataformDetectorService: PlataformDetectorService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService){}
    
    ngOnInit(): void {
        this.activatedRoute
            .queryParams.subscribe(params => this.paraURL = params['paraURL']);

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.plataformDetectorService.isPlatformBrowser &&
            this.userNameInput.nativeElement.focus();
    }

    login() {

        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(

                () => {
                    if(this.paraURL)
                        this.router.navigateByUrl(this.paraURL);
                    else
                        this.router.navigate(['user', userName]);
                },

                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.plataformDetectorService.isPlatformBrowser &&
                        this.userNameInput.nativeElement.focus();
                    this.alertService.danger('Usuário ou senha inválida');
                }
            )
    }
}