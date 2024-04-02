import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataManagerService) {
    console.log("Hellow Buyer Module!!")
  }

  ngOnInit(): void {
    this.dashboardClicked();
  }

  dashboardClicked() {
    this.router.navigate([{ outlets: { supplierHome: ['dashboard'] } }], { relativeTo: this.route.parent, skipLocationChange: true });
  }

  settingsClicked() {
    this.router.navigate([{ outlets: { supplierHome: ['settings'] } }], { relativeTo: this.route.parent, skipLocationChange: true });
  }


  logOut() {
    console.log("Logout clicked !!");
    this.dataService.clearToken();
    this.router.navigate(['/auth'], { relativeTo: this.route.parent});
  }

}
