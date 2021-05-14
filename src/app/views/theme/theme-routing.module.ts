import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import {ColorsDetailComponent} from './colors.detail.component';
import { CourseComponent } from './course.component';
import {PupilListComponent} from './pupil.list.component';
import {PupilDetailComponent} from './pupil.detail.component';
import { HomeworkComponent } from './homework.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    data: {
      title: 'Курсы'
    }
  },
  {
    path: 'view/:id',
    component: ColorsComponent,
    data: {
      title: 'Курс'
    }
  },
  {
    path: 'detail/:id',
    component: ColorsDetailComponent,
    data: {
      title: 'Задачи'
    }
  },
  {
    path: 'pupil',
    component: PupilListComponent,
    data: {
      title: 'Ученики'
    }
  },
  {
    path: 'pupil/detail/:id',
    component: PupilDetailComponent,
    data: {
      title: 'Ученик'
    }
  },
  {
    path: 'homework/:id',
    component: HomeworkComponent,
    data: {
      title: 'Работа'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
