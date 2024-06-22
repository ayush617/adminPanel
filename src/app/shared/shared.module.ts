import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MainModule} from "../../@common/main.module"

@NgModule({
  imports: [
    CommonModule,
    MainModule,
  ],
  declarations: [
  ],
  exports: [
    MainModule,
  ]
})
export class SharedModule {
  constructor() {

  }
}
