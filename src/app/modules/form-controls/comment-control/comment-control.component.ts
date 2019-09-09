import {Component, forwardRef, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
    selector: 'app-comment-control',
    styleUrls: ['./comment-control.component.less'],
    templateUrl: './comment-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CommentControlComponent),
            multi: true
        }
    ]
})
export class CommentControlComponent implements OnInit, ControlValueAccessor {
    @Input()
    public value = '';

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
