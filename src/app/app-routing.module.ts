import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { AuthGuard } from './shared/guard/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    data:{
      breadcrumb: 'Home'
    },
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: '**',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full',
  // },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
