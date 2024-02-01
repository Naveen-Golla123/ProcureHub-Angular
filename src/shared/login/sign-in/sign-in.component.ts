import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/AuthService.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService){

  }

  signUpClicked() {
    this.router.navigate([{ outlets: { AuthOutlet: ['signup'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

  signIn(){
    // pass the username and password
    let result = this.authService.signIn();

    if(result) {
      // navigate 
    } else {
      // throw an error message.
    }
  }
}
