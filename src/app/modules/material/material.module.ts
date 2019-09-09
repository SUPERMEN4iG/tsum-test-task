import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule, MatIconModule,
    MatInputModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule,
    MatTabsModule
} from '@angular/material';

const includedModules = [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
];

@NgModule({
    imports: [includedModules],
    exports: [includedModules]
})
export class MaterialModule {}
