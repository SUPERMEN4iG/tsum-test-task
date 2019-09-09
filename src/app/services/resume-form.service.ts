import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, timer} from 'rxjs';
import {ResumeFormModel} from '../models/resume-form.model';
import {AttemptFormStateEnum} from '../enums/attempt-form-state.enum';
import {skipUntil, switchMap} from 'rxjs/operators';
import {ResumeDataService} from './resume-data.service';

@Injectable()
export class ResumeFormService {
    public curAttempt = 0;

    public state: BehaviorSubject<AttemptFormStateEnum> = new BehaviorSubject(AttemptFormStateEnum.unlock);
    public workers: Subject<number> = new Subject<number>();

    private $worker?: Observable<number>;

    private readonly attempts = 3;
    private readonly interval = 10 * 1000;

    private readonly resumeDataService: ResumeDataService;

    constructor(resumeDataService: ResumeDataService) {
        this.resumeDataService = resumeDataService;
        this.workers
            .pipe(
                skipUntil(this.$worker || of(0)),
                switchMap(() => {
                    if (this.curAttempt >= this.attempts) {
                        this.curAttempt = 0;
                        this.state.next(AttemptFormStateEnum.reset);
                    } else {
                        this.curAttempt++;
                        this.state.next(AttemptFormStateEnum.locked);
                        this.$worker = timer(this.interval);
                    }

                    return this.$worker || of(0);
                })
            )
            .subscribe(() => {
                this.state.next(AttemptFormStateEnum.unlock);
                this.$worker = undefined;
            });
    }

    public send(formData: ResumeFormModel, isFormValid: boolean = false): boolean {
        if (!isFormValid) {
            this.workers.next(this.curAttempt);
            return false;
        }

        this.resumeDataService.data.next(formData);

        return true;
    }
}
