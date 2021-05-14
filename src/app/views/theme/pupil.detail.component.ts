import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PupilService} from '../../sevices/pupil.service';
import {CourseService} from '../../sevices/course.service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'pupil.detail.component.html'
})
export class PupilDetailComponent implements OnInit {
  pupilId: number;
  courseId: number;
  exercises: '';
  course: any = {courseTopics: []};
  homeworkList: Array<any> = [];
  newHomeworkId: Array<any> = [];
  isAddHomeWork: boolean = false;
  constructor(private pupilService: PupilService,
              private courseService: CourseService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.pupilId = this.activateRoute.snapshot.params['id'];
    this.courseId = 1;
    this.uploadHomeWork();
    this.uploadCourse();
  }

  uploadHomeWork() {
    this.pupilService.getPupilHomeWorkList(this.pupilId).subscribe(resp => {
      this.homeworkList = resp.homeWorkList;
    });
  }

  uploadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe(resp => {
      this.course = resp.course;
      console.log(this.course);
    });
  }

  uploadExercises(id: number) {
    this.courseService.getTopicCourse(id).subscribe(resp => {
      this.exercises = resp.exercises;
    });
  }

  addExerciseToHomework(id: number) {
    this.newHomeworkId.push(id);
  }

  createHomeWork() {
    this.pupilService.createHomeWork(1, this.pupilId, this.newHomeworkId)
      .subscribe(resp => {
        this.newHomeworkId = [];
        this.uploadHomeWork();
        this.isAddHomeWork = false;
      });
  }

  sortBy(value: any, prop: string) {
    return value.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  sortByDesc(value: any, prop: string) {
    return value.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1);
  }

  getFileUrl(id) {
    return `${environment.apiUrl}/file/download?fileId=${id}`;
  }

  isHideExercise(id: number) {
    return this.newHomeworkId.indexOf((id)) > -1;
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
}
