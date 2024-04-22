import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Supplier } from 'src/shared/models/supplier';
import { SupplierService } from 'src/shared/services/SupplierService.service';



@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quality', 'deliveryTime', "update"];
  dataSource = new MatTableDataSource<any>();
  public suppliers: Supplier[] = [];
  headerCofig: any = {
    title: "Auctions",
    subTitle: "",
    enableSubTitle: false
  }

  constructor(private spinnerService: NgxSpinnerService, private supplierService: SupplierService) {

  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.supplierService.getAllSuppliers().subscribe((result: any) => {
      this.spinnerService.hide();
      if (result && result.length > 0) {
        result.forEach((supplier: any) => {
          let supplier_: Supplier = {
            name: supplier.name,
            email: supplier.email,
            id: supplier.id,
            partnerName: "",
            priceReview : supplier.priceReview ? supplier.priceReview : 0,
            deliveryReview: supplier.deliveryReview ? supplier.deliveryReview : 0,
            qualityReview: supplier.deliveryReview ? supplier.deliveryReview : 0
          };
          this.suppliers.push(supplier_);
        });
        this.dataSource.data = this.suppliers;
      }
      this.spinnerService.hide();
    })
  }

  saveSupplier(element: Supplier) {
    console.log(element);
    this.spinnerService.show();
    this.supplierService.updateSupplierReviews(element).subscribe((res:any)=>{
      this.spinnerService.hide();
    });
  }
}
