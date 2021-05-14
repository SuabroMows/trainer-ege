import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import {CourseService} from '../../sevices/course.service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'colors.detail.component.html'
})
export class ColorsDetailComponent implements OnInit {
  id: number;
  exercises: '';
  description: '';
  answer: '';
  answerType: string = 'STANDART';
  isAddExercise: boolean;
  filesDescript: Array<File> = [];
  filesDownload: Array<File> = [];
  durations: Array<any> = [{title: 'Стандартный', value: 'STANDART'}, {title: 'С исходным кодом программы', value: 'PROGRAMMING'}];

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.uploadExercises();
  }

  uploadExercises() {
    this.courseService.getTopicCourse(this.id).subscribe(resp => {
      this.exercises = resp.exercises;
    });
  }

  clearExerciseForm() {
    this.description = '';
    this.answer = '';
    this.filesDescript = [];
    this.filesDownload = [];
    this.isAddExercise = false;
  }

  deleteExercise(id: number) {
    this.courseService.deleteCourseExercise(id)
      .subscribe(data => {
        this.uploadExercises();
      });
  }

  addExercise() {
    this.courseService.addExercise(
      String(this.id),
      this.description,
      this.answer,
      this.answerType,
      this.filesDescript,
      this.filesDownload
    ).subscribe(
      data => {
        this.isAddExercise = false;
        this.clearExerciseForm();
        this.uploadExercises();
      }
    );
  }

  droppedDescript(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          this.filesDescript.push(file);
        });
      }
    }
  }

  filesDescriptRemove(index: number) {
    this.filesDescript.splice(index, 1);
  }

  droppedAttach(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          this.filesDownload.push(file);
        });
      }
    }
  }

  filesAttachRemove(index: number) {
    this.filesDownload.splice(index, 1);
  }


  getFileUrl(id) {
    return `${environment.apiUrl}/file/download?fileId=${id}`;
  }
}
