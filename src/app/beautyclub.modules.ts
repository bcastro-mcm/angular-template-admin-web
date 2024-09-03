import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ComponentsModule } from '@components/components.module';
import { PipesModule } from '@pipes/pipes.module';
import { DirectivesModule } from '@directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ErrorComponent } from '@modules/error/error.component';

@NgModule({
    imports: [
        ErrorComponent
    ],
    exports: [
        MaterialModule,
        ComponentsModule,
        PipesModule,
        DirectivesModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule,
        ErrorComponent
    ],
})
export class BeautyClubModule { }
