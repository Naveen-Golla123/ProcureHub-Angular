import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/AuthService.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private dataManagerService: DataManagerService,
    private spinner: NgxSpinnerService) {
    this.email = "";
    this.password = "";
  }
  ngOnInit(): void {
  }

  signUpClicked() {
    this.router.navigate([{ outlets: { AuthOutlet: ['signup'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

  signIn() {
    // pass the username and password
    this.validateDetails();
    console.log(this.email, this.password);
    this.spinner.show();
    this.authService.signIn(this.email, this.password).subscribe(result => {
      this.spinner.hide();
      if (result && result.status) {
        this.dataManagerService.setToken(result.token);
        this.toastr.success('LoggedIn', this.email + ' loggedIn successfully !!');
        var userInfo = this.dataManagerService.getUserInfo();
        if(userInfo && userInfo.isSupplier == 'True') {
          this.router.navigate(['/supplierHome'], { relativeTo: this.route.parent })
        } else {
          this.router.navigate(['/buyerHome'], { relativeTo: this.route.parent })
        }
      } else {
        this.toastr.error('Error', 'Invalid email and password');
      }
    });
  }

  validateDetails() {
    return this.email && this.email.length > 0 && this.password && this.password.length > 0;
  }
}
