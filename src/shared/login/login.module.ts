import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthEntryComponent } from './auth-entry/auth-entry.component';
import { AuthRoutingModule } from './login-routing.module';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { AuthService } from '../services/AuthService.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AuthEntryComponent,
    FeatureCardComponent
  ],
  bootstrap:[AuthEntryComponent],
  imports: [
    CommonModule, AuthRoutingModule, FormsModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
