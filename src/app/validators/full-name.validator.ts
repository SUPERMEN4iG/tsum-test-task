import {AbstractControl} from '@angular/forms';

export function fullNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined &&
        !(new RegExp(/^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]/).test(control.value))
    ) {
        return { fullName: true };
    }

    return null;
}
