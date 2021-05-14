import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { CommonModule } from '@angular/common';
import { HomeworkDetailComponent } from './homework.detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartJSRoutingModule,
    ChartsModule
  ],
  declarations: [
    ChartJSComponent,
    HomeworkDetailComponent
  ]
})
export class ChartJSModule { }
