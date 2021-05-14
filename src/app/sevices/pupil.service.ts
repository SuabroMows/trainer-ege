import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PupilService {
  constructor(private http: HttpClient) {}

  getPulilList() {
    return this.http.get<any>(`${environment.apiUrl}/teach/pupil/list`);
  }

  getPupilHomeWorkList(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/teach/pupil/homework/list?pupilId=${id}`);
  }

  getMyHomeWorkList() {
    return this.http.get<any>(`${environment.apiUrl}/pupil/task/homework/list`);
  }

  createPupil(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/teach/pupil/create`, {
      name: name,
      email: email,
      password: password
    });
  }

  answerHomeWork(exerciseId: number, answerDetail: string, answer: string) {
    return this.http.post<any>(`${environment.apiUrl}/pupil/task/homework/answer`, {
      exerciseId: exerciseId,
      answerDetail: answerDetail,
      answer: answer
    });
  }

  getHomeWorkById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/teach/pupil/homework?id=${id}`);
  }

  finishHomeWorkExercise(id: number, status: any) {
    return this.http.post<any>(`${environment.apiUrl}/teach/pupil/homework/exercise/finish`, {
      homeworkExerciseId: id,
      status: status
    });
  }

  createHomeWork(courseId: number, pupilId: number, courseExerciseIds: Array<any>) {
    return this.http.post<any>(`${environment.apiUrl}/teach/pupil/homework/create`, {
      courseId: courseId,
      pupilId: pupilId,
      courseExerciseIds: courseExerciseIds
    });
  }
}
