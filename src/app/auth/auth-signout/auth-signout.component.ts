import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signout',
  templateUrl: './auth-signout.component.html',
  styleUrls: ['./auth-signout.component.scss']
})
export class AuthSignoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("profile");
    this.router.navigate(['/auth'])
  }

}
