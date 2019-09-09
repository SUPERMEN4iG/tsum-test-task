import {AbstractControl} from '@angular/forms';

export function cyrillicValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value != null &&
        control.value !== '' &&
        !(new RegExp(/[а-яА-Я]+/).test(control.value))
    ) {
        return { cyrillic: true };
    }

    return null;
}
