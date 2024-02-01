import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  signInClicked() {
    console.log("Sign In Clicked");
    this.router.navigate([{ outlets: { AuthOutlet: ['signin'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

}
