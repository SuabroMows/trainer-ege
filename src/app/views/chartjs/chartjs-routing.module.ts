import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartJSComponent } from './chartjs.component';
import {HomeworkDetailComponent} from './homework.detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChartJSComponent,
    data: {
      title: 'Задачи'
    }
  },
  {
    path: 'homework/:id',
    component: HomeworkDetailComponent,
    data: {
      title: 'Задачи'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartJSRoutingModule {}
