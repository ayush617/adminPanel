import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  public profile
  public leftSidebarVisibility: boolean = true

  constructor(private _profile: ProfileService,) { }

  ngOnInit() {
    this.profile = this._profile.data;
  }

}
