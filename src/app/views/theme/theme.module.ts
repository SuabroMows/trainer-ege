// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { ColorsDetailComponent } from './colors.detail.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PupilListComponent } from './pupil.list.component';
import {PupilDetailComponent} from './pupil.detail.component';
import {HomeworkComponent} from './homework.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    NgxFileDropModule,
    FormsModule,
    TabsModule
  ],
  declarations: [
    ColorsComponent,
    ColorsDetailComponent,
    TypographyComponent,
    CourseComponent,
    PupilListComponent,
    PupilDetailComponent,
    HomeworkComponent
  ]
})
export class ThemeModule { }
