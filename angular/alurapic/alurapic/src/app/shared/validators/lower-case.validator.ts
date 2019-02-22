import { AbstractControl } from "@angular/forms";

export function LowerCaseValidator(control: AbstractControl) {

    if( control.value.trim() && !/^[a-z]+[a-z0-9]*$/.test(control.value) )
        return { lowerCase: true };
    
        
    return null;
}