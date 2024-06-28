import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-auth-signout',
  templateUrl: './auth-signout.component.html',
  styleUrls: ['./auth-signout.component.scss']
})
export class AuthSignoutComponent implements OnInit {

  constructor(private router: Router,
              private _profile: ProfileService
  ) { }

  ngOnInit() {
    this._profile.data = ""
    localStorage.removeItem("authToken");
    localStorage.removeItem("_profile");
    this.router.navigate(['/auth'])
  }

}
