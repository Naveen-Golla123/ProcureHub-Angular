import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../shared/services/AuthGaurd';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurd],
    component: AppComponent
    //loadChildren: ()=> load base page
  },
  {
    path: 'auth',
    loadChildren: ()=> import('../shared/login/login.module').then(m=> m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
