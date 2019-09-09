import {Component, OnInit} from '@angular/core';
import {ResumeFormModel} from '../../../models/resume-form.model';
import {ResumeDataService} from '../../../services/resume-data.service';

@Component({
    selector: 'app-resume-result-page',
    styleUrls: ['./resume-result-page.component.less'],
    templateUrl: './resume-result-page.component.html'
})
export class ResumeResultPageComponent implements OnInit {
    public get resume() {
        return Object.entries(this.data)
            .filter(([k, v]) => v)
            .map(([k, v]) => {
                return {
                    key: k,
                    value: v
                };
            });
    }

    public data?: ResumeFormModel;

    private readonly resumeDataService: ResumeDataService;

    constructor(resumeDataService: ResumeDataService) {
        this.resumeDataService = resumeDataService;
    }

    public ngOnInit(): void {
        this.data = this.resumeDataService.data.getValue();
    }

}
