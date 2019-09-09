import {Component, forwardRef, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
    selector: 'app-date-birth-control',
    styleUrls: ['./date-birth-control.component.less'],
    templateUrl: './date-birth-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateBirthControlComponent),
            multi: true,
        }
    ]
})
export class DateBirthControlComponent implements ControlValueAccessor, OnInit {
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
