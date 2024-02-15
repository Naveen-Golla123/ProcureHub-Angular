import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/User.model';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  user:User;
  isEmailAvailable: boolean = true;
  isPasswordMatched: boolean = true;
  isEligibleToRegister = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.user = new User();
  }

  signInClicked() {
    console.log("Sign In Clicked");
    this.router.navigate([{ outlets: { AuthOutlet: ['signin'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

  signUp() {
    if(!this.confirmPassword() || !this.isEmailAvailable){
      return;
    }

    this.authService.signUp(this.user).subscribe(result=>{
      console.log(result);
    })
    
  }

  confirmPassword() {
    return this.user.password == this.user.confirmPassword;
  }

  checkPassword(){
    this.isPasswordMatched = this.confirmPassword();
  }

  emailChanged() {
    this.isEmailAvailable = false;
    let self = this;
    this.authService.isEmailAvailable(this.user.email).subscribe(result=>{
      self.isEmailAvailable = !result;
    });
    // make and API call
  }



}
