import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fullNameValidator} from '../../../validators/full-name.validator';
import {ResumeFormModel} from '../../../models/resume-form.model';
import {filter, map} from 'rxjs/operators';
import {getAgeFromDate} from '../../../helpers/date.helper';
import {cyrillicValidator} from '../../../validators/cyrillic.validator';
import {ResumeFormService} from '../../../services/resume-form.service';
import {AttemptFormStateEnum} from '../../../enums/attempt-form-state.enum';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    styleUrls: ['./resume-form-page.component.less'],
    templateUrl: './resume-form-page.component.html',
    providers: [ResumeFormService]
})
export class ResumeFormPageComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public formSubmiting = false;
    public formSubmited = false;

    public isAdult = false;
    public isLocked = false;

    public resume = new ResumeFormModel();

    private $valueChangesSub: Subscription;
    private $stateChangesSub: Subscription;

    private readonly formBuilder: FormBuilder;
    private readonly resumeFormService: ResumeFormService;
    private readonly router: Router;

    constructor(formBuilder: FormBuilder,
                resumeFormService: ResumeFormService,
                router: Router) {
        this.formBuilder = formBuilder;
        this.resumeFormService = resumeFormService;
        this.router = router;
    }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            fio: ['', [Validators.required, fullNameValidator]],
            gender: ['', [Validators.required]],
            dateBirth: ['', Validators.required],
            maritalStatus: [''],
            children: [null],
            email: ['', [Validators.required, Validators.email]],
            comment: ['', cyrillicValidator]
        });

        this.form.reset();

        this.$valueChangesSub = this.form.valueChanges
            .pipe(
                map((values) => new ResumeFormModel(values)),
                filter((value) => !value.equals(this.resume))
            )
            .subscribe((values: ResumeFormModel) => {
                this.resume = values;

                if (values.dateBirth) {
                    this.onDateBirthChanges();
                }
            });

        this.$stateChangesSub = this.resumeFormService.state.subscribe((x) => {
            switch (x) {
                case AttemptFormStateEnum.locked:
                    this.isLocked = true;
                    break;
                case AttemptFormStateEnum.unlock:
                    this.isLocked = false;
                    break;
                case AttemptFormStateEnum.reset:
                    this.form.reset();
                    break;
            }
        });
    }

    public onFormSubmit(): void {
        this.formSubmiting = true;
        this.form.markAllAsTouched();

        this.resumeFormService.send(this.resume, this.form.valid);

        if (this.form.invalid) {
            this.formSubmiting = false;
            return;
        }

        this.router.navigate(['success']);

        this.formSubmiting = false;
        this.formSubmited = true;
    }

    public onDateBirthChanges(): void {
        const maritalStatusControl = this.form.controls.maritalStatus;
        if (getAgeFromDate(this.resume.dateBirth) > 18) {
            maritalStatusControl.markAsTouched();
            this.isAdult = true;
        } else {
            if (maritalStatusControl.value !== '') {
                maritalStatusControl.setValue('');
            }
            maritalStatusControl.markAsTouched();
            this.isAdult = false;
        }
    }

    public ngOnDestroy(): void {
        if (this.$stateChangesSub) {
            this.$stateChangesSub.unsubscribe();
        }

        if (this.$valueChangesSub) {
            this.$valueChangesSub.unsubscribe();
        }
    }

}
