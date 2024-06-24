import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  data = JSON.parse(localStorage.getItem("_profile"))

  constructor() { }

}
