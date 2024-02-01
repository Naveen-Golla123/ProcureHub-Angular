import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageFature } from 'src/shared/models/home-page-feature';

@Component({
  selector: 'app-auth-entry',
  templateUrl: './auth-entry.component.html',
  styleUrls: ['./auth-entry.component.scss']
})

export class AuthEntryComponent implements OnInit {

  public authPageFeatures: HomePageFature[] = [
    {
      name: "Smart Bids, Better Business.",
      url: "../../../assets/videos/Biding.mp4"
    },
    {
      name: "Negotiate Instantly, Secure Swiftly.",
      url: "../../../assets/videos/Messages.mp4"
    },
    {
      name: "Insights that Ignite Growth.",
      url: "../../../assets/videos/Analysis.mp4"
    },
    {
      name: "From Bid to Contract, Seamless.",
      url: "../../../assets/videos/Contracts.mp4"
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.signInClicked();
  }

  signUpClicked() {
    console.log("Sign Up Clicked");
    this.router.navigate([{ outlets: { AuthOutlet: ['signup'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }

  signInClicked() {
    console.log("Sign In Clicked");
    this.router.navigate([{ outlets: { AuthOutlet: ['signin'] } }], { relativeTo: this.route.parent, skipLocationChange: true })
  }
}
