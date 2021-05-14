import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import {CourseService} from '../../sevices/course.service';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  courses = '';
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourse().subscribe(resp => {
      this.courses = resp.course;
      console.log(this.courses);
    });
  }

  sortBy(value: any, prop: string) {
    return value.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
}
