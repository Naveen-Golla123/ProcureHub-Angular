import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/AuthService.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  email: string;
  password: string;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private dataManagerService: DataManagerService) {
    this.email = "";
    this.password = "";
  }

  signUpClicked() {
    this.router.navigate([{ outlets: { AuthOutlet: ['signup'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

  signIn() {
    // pass the username and password
    this.validateDetails();
    console.log(this.email, this.password);
    this.authService.signIn(this.email, this.password).subscribe(result => {
      if (result && result.status) {
        this.dataManagerService.setToken(result.token);
        this.router.navigate(['/buyerHome'], { relativeTo: this.route.parent })
      }
    });
  }

  validateDetails() {
    return this.email && this.email.length > 0 && this.password && this.password.length > 0;
  }
}
