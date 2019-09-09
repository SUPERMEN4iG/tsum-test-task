import {NgModule} from '@angular/core';
import {FioControlComponent} from './fio-control/fio-control.component';
import {MaterialModule} from '../material/material.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GenderControlComponent} from './gender-conrol/gender-control.component';
import {DateBirthControlComponent} from './date-birth-control/date-birth-control.component';
import {MaritalStatusControlComponent} from './marital-status-control/marital-status-control.component';
import {ChildrenCounterControlComponent} from './children-counter-control/children-counter-control.component';
import {EmailControlComponent} from './email-control/email-control.component';
import {CommentControlComponent} from './comment-control/comment-control.component';

const FORM_CONTROLS = [
    FioControlComponent,
    GenderControlComponent,
    DateBirthControlComponent,
    MaritalStatusControlComponent,
    ChildrenCounterControlComponent,
    EmailControlComponent,
    CommentControlComponent
];

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...FORM_CONTROLS
    ],
    exports: [
        ...FORM_CONTROLS
    ]
})
export class FormControlsModule {}
