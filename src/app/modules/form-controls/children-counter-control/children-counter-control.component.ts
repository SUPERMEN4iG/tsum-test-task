import {Component, forwardRef, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
    selector: 'app-children-counter-control',
    styleUrls: ['./children-counter-control.component.less'],
    templateUrl: './children-counter-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ChildrenCounterControlComponent),
            multi: true,
        }
    ]
})
export class ChildrenCounterControlComponent implements ControlValueAccessor, OnInit {
    @Input()
    public value?: number;

    private min = 0;
    private max = Infinity;

    public formControl: NgControl;

    constructor(private injector: Injector,
                @Optional() @Inject(NG_VALIDATORS) private validators) {
    }

    public ngOnInit(): void {
        this.formControl = this.injector.get(NgControl);
    }

    public increment() {
        this.value =
            this.value + 1 < this.max ?
            this.value + 1 : this.value || this.min || 1;
    }

    public decrement() {
        this.value =
            this.value - 1 >= this.min ?
            this.value - 1 : this.min;
    }

    public writeValue(obj: any) {
        if (obj) {
            this.value = Number(obj);
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
