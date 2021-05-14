import { Component } from '@angular/core';
import {PupilService} from '../../sevices/pupil.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'homework.component.html'
})
export class HomeworkComponent {
  homeworkId: number;
  homeWork: {exercises: []};

  constructor(private pupilService: PupilService,
              private activateRoute: ActivatedRoute) {
    this.homeworkId = this.activateRoute.snapshot.params['id'];
    this.uploadHomeWork();
  }

  uploadHomeWork() {
    this.pupilService.getHomeWorkById(this.homeworkId)
      .subscribe(resp => {
        this.homeWork = resp.homeWork;
      });
  }

  getFileUrl(id) {
    return `${environment.apiUrl}/file/download?fileId=${id}`;
  }

  finilize(exercise: any) {
    this.pupilService.finishHomeWorkExercise(exercise.id, exercise.status)
      .subscribe(resp => {
        exercise.finalized = true;
      });
  }
}
