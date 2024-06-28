import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  data = JSON.parse(localStorage.getItem("_profile"))

  constructor() { }

  updateProfile(obj){
    let oldData = this.data
    this.data = {}
    this.data = {...oldData,...obj};
    localStorage.setItem('_profile', JSON.stringify(this.data));
    return this.data
  }

}
