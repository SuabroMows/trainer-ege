import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourse() {
    return this.http.get<any>(`${environment.apiUrl}/teach/course/list`);
  }

  getCourseById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/teach/course?courseId=${id}`);
  }

  getTopicCourse(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/teach/course/exercise/list?exerciseByTopicId=${id}`);
  }

  deleteCourseExercise(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/teach/course/exercise/delete`, {
      courseExerciseId: id
    });
  }

  addExercise(courseTopicId: string, description: any, answer: any, answerType: any, descriptionImg: any, downloadFiles: any) {
    const formData = new FormData();
    formData.append('courseTopicId', courseTopicId);
    formData.append('answer', answer);
    formData.append('answerType', answerType);

    if (description) {
      formData.append('description', description);
    }

    if (descriptionImg) {
      for (const file of descriptionImg) {
        formData.append('descriptionImg', file);
      }
    }

    if (downloadFiles) {
      for (const file of downloadFiles) {
        formData.append('downloadFiles', file);
      }
    }
    return this.http.post<any>(`${environment.apiUrl}/teach/course/exercise/add`, formData);
  }
}
