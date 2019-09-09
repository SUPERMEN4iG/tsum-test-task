import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './modules/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from './components/layout/layout.component';
import {ResumeFormPageComponent} from './components/pages/resume-form-page/resume-form-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControlsModule} from './modules/form-controls/form-controls.module';
import {ResumeResultPageComponent} from './components/pages/resume-result-page/resume-result-page.component';
import {ResumeDataService} from './services/resume-data.service';
import {ResumeResultPageGuard} from './guards/resume-result-page.guard';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule,
        AppRoutingModule
    ],
    declarations: [
        LayoutComponent,
        AppComponent,
        ResumeFormPageComponent,
        ResumeResultPageComponent
    ],
  providers: [
      ResumeDataService,
      ResumeResultPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
