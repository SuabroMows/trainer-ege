import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { User, UserDetail } from '../../models/user';
import {PupilService} from '../../sevices/pupil.service';
import {AuthenticationService} from '../../sevices/authentication.service';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit {
  homeworkList: Array<any> = [];
  currentUser: UserDetail;
  constructor(private pupilService: PupilService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.session.user;
    this.uploadHomeWorkList();
  }

  uploadHomeWorkList() {
    this.pupilService.getMyHomeWorkList().subscribe(resp => {
      this.homeworkList = resp.homeWorkList;
      console.log(this.homeworkList);
    });
  }

  formatDate(value: string) {
    const dateTerm = value.split(' ')[0].split('-');
    return dateTerm[2] + '.' + dateTerm[1] + '.' + dateTerm[0];
  }

  getStatus(homework: any) {
    let isNew = true;
    for (const exercise of homework.exercises) {
      if (exercise.status !== 'NEW') {
        isNew = false;
      }
    }
    if (isNew) {
      return 'Новое';
    } else {
      let isCompleted = true;
      for (const exercise of homework.exercises) {
        if (exercise.status === 'NEW') {
          isCompleted = false;
        }
      }
      if (isCompleted) {
        let isAllAnswered = true;
        for (const exercise of homework.exercises) {
          if (exercise.status !== 'ANSWERED') {
            isAllAnswered = false;
          }
        }
        if (isAllAnswered) {
          return 'Готово к проверке';
        } else {
          return 'Завершенно';
        }
      } else {
        return 'Начато';
      }
    }
  }

  sortBy(value: any, prop: string) {
    return value.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1);
  }
}
