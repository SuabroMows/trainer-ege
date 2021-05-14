import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PupilService} from '../../sevices/pupil.service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'homework.detail.component.html'
})
export class HomeworkDetailComponent implements OnInit {
  homework: any;
  homeWorkId: number;
  value: string = '10';
  constructor(private pupilService: PupilService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.homeWorkId = this.activateRoute.snapshot.params['id'];
    this.uploadHomeWork();
  }

  getFileUrl(id) {
    return `${environment.apiUrl}/file/download?fileId=${id}`;
  }

  answer(id: number, exercise: any) {
    console.log(exercise);
    this.pupilService.answerHomeWork(
      id,
      exercise.answerDetail,
      exercise.answer
    ).subscribe(resp => {
      this.uploadHomeWork();
      alert('Успешно');
    });
  }

  uploadHomeWork() {
    this.pupilService.getHomeWorkById(this.homeWorkId)
      .subscribe(resp => {
        this.homework = resp.homeWork;
      });
  }

  formatDate(value: string) {
    const dateTerm = value.split(' ')[0].split('-');
    return dateTerm[2] + '.' + dateTerm[1] + '.' + dateTerm[0];
  }
}
