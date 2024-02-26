import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input("config") config: any;

  constructor(private router: Router) {

  }

  navigateBack(){
    this.router.navigate(['dashboard'])
  }

}
