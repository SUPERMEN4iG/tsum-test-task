import {Component, ContentChild, forwardRef, Inject, Injector, Input, OnInit, Optional, Self} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor, FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validator
} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../helpers/error-state-matcher';

@Component({
    selector: 'app-fio-control',
    styleUrls: ['./fio-control.component.less'],
    templateUrl: './fio-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FioControlComponent),
            multi: true,
        }
    ]
})
export class FioControlComponent implements ControlValueAccessor, OnInit {
    @Input()
    public value = '';

    public matcher = new MyErrorStateMatcher();

    public formControl: NgControl;

    constructor(public injector: Injector,
                @Optional() @Inject(NG_VALIDATORS) private validators) {
    }

    public ngOnInit() {
        this.formControl = this.injector.get(NgControl);
    }

    public writeValue(obj: any) {
        if (obj) {
            this.value = String(obj);
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
    private onChange(event: KeyboardEvent) {
        this.propagateChange(this.value);
    }

    private propagateChange = (_: any) => { };
}
