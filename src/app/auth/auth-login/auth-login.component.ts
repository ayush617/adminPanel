import {Component, OnInit} from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms"
import {Router} from '@angular/router'

import {NotificationService} from "carbon-components-angular"

import {UpdateService} from "../../services/update.service"
import { ProfileService } from 'src/app/services/profile.service'

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  public formGroup: FormGroup

  constructor(protected formBuilder: FormBuilder,
              private router: Router,
              private notificationService: NotificationService,
              private _update: UpdateService,
              private _profile: ProfileService,) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }, {updateOn: 'blur'})
  }

  onSubmit() {
    this._update.login(this.formGroup.value)
    .subscribe({
      next: (response) => {
        localStorage.setItem("authToken",JSON.stringify(response.data.authToken))
        this._profile.updateProfile(response.data)
        this.notificationService.showToast({
          type: "success",
          title: response.message,
          target: "#notificationHolder",
          duration: 2000,
        })
         this.router.navigate(['/home'])
      },
      error: (error) => {
        this.notificationService.showToast({
          type: "error",
          title: error,
          target: "#notificationHolder",
          duration: 2000,
        })
      }
    });
    // this.formGroup.markAllAsTouched()
    // this.router.navigate(['/app'])
    // this.notificationService.showToast({
    //   type: "info",
    //   title: "Sample toast",
    //   subtitle: "Sample subtitle message",
    //   caption: "Sample caption",
    //   target: "#notificationHolder",
    //   message: "message",
    //   duration: 2000,
    // })
  }

  isValid(name) {
    const instance = this.formGroup.get(name)
    return instance.invalid && (instance.dirty || instance.touched)
  }
}
