import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ResumeFormModel} from '../models/resume-form.model';

@Injectable()
export class ResumeDataService {
    public data: BehaviorSubject<ResumeFormModel | undefined> = new BehaviorSubject(undefined);
}
