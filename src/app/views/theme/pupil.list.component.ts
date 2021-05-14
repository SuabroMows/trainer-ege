import { Component, OnInit } from '@angular/core';
import { CreateUser } from '../../models/user';
import { PupilService } from '../../sevices/pupil.service';

@Component({
  templateUrl: 'pupil.list.component.html'
})
export class PupilListComponent implements OnInit {
  pupils: Array<any> = [];
  pupil: CreateUser = new CreateUser();
  isAddPupil: boolean = false;

  constructor(private pupilService: PupilService) {}

  ngOnInit() {
    this.uploadPupil();
  }

  uploadPupil() {
    this.pupilService.getPulilList().subscribe(resp => {
      this.pupils = resp.pupils;
    });
  }

  addPupil() {
    this.pupilService.createPupil(
      this.pupil.name,
      this.pupil.email,
      this.pupil.password
    ).subscribe(resp => {
      this.uploadPupil();
      this.isAddPupil = false;
      this.pupil.name = '';
      this.pupil.email = '';
      this.pupil.password = '';
    });
  }
}
