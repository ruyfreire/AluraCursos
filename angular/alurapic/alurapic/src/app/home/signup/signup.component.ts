import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { LowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { SignUpService } from './signup.service';
import { NewUser } from './new-user';
import { PlataformDetectorService } from './../../core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {
    
    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder,
        private userTaken: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private plataformDetectorService: PlataformDetectorService) {}
    
    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(40),
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    LowerCaseValidator,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                ],
                this.userTaken.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14),
                ]
            ],
        });

        this.plataformDetectorService.isPlatformBrowser &&
                this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService.signup(newUser)
            .subscribe(() => {
                    this.router.navigate(['']);
                    alert(`Usuário ${newUser.userName} cadastrado com sucesso!`);
                },
                err => console.log(err)
            );
    }

}