import {Component, forwardRef, Inject, Injector, Input, OnInit, Optional, SimpleChanges} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_ASYNC_VALIDATORS,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validator
} from '@angular/forms';

@Component({
    selector: 'app-gender-control',
    styleUrls: ['./gender-control.component.less'],
    templateUrl: './gender-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GenderControlComponent),
            multi: true,
        }
    ]
})
export class GenderControlComponent implements ControlValueAccessor, OnInit {
    @Input()
    public value = '';

    public formControl: NgControl;

    constructor(private injector: Injector,
                @Optional() @Inject(NG_VALIDATORS) private validators) {
    }

    public ngOnInit(): void {
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
        this.registerOnTouched();
    }

    private propagateChange = (_: any) => { };
}
