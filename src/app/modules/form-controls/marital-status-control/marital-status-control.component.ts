import {Component, forwardRef, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
    selector: 'app-marital-status-control',
    styleUrls: ['./marital-status-control.component.less'],
    templateUrl: './marital-status-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaritalStatusControlComponent),
            multi: true,
        }
    ]
})
export class MaritalStatusControlComponent implements ControlValueAccessor, OnInit {
    @Input()
    public value = '';

    @Input()
    public gender?: number;

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
