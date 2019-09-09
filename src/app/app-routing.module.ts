import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResumeFormPageComponent} from './components/pages/resume-form-page/resume-form-page.component';
import {ResumeResultPageComponent} from './components/pages/resume-result-page/resume-result-page.component';
import {ResumeResultPageGuard} from './guards/resume-result-page.guard';


const routes: Routes = [
    {
        path: '',
        component: ResumeFormPageComponent
    },
    {
        path: 'success',
        component: ResumeResultPageComponent,
        canActivate: [ResumeResultPageGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
