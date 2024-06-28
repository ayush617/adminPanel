import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout-basic',
  templateUrl: './app-layout-basic.component.html',
  styleUrls: ['./app-layout-basic.component.scss']
})
export class AppLayoutBasicComponent implements OnInit {

  constructor() { }

  colorOptions = [
    "app-bg-primary-o-40",
    "app-bg-secondary-o-40",
    "app-bg-warning-o-40",
    "app-bg-danger-o-40",
    "app-bg-success-o-40"
  ]

  color

  ngOnInit(): void {
    this.color = this.getRandomItem(this.colorOptions)
  }

  getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

}
