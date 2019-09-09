import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ResumeDataService} from '../services/resume-data.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ResumeResultPageGuard implements CanActivate {
    private readonly resumeDataService: ResumeDataService;
    private readonly router: Router;

    constructor(resumeDataService: ResumeDataService,
                router: Router) {
        this.resumeDataService = resumeDataService;
        this.router = router;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const rr = this.resumeDataService.data.getValue() != null;
        if (!rr) {
            this.router.navigate(['']);
        }
        return rr;
    }
}
