import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/shared/models/supplier';
import { SupplierService } from 'src/shared/services/SupplierService.service';
import { LotDetailsComponent } from '../lot-details/lot-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/shared/services/EventService.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-supplier-repository',
  templateUrl: './supplier-repository.component.html',
  styleUrls: ['./supplier-repository.component.scss']
})
export class SupplierRepositoryComponent implements OnInit{

  public suppliers: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();
  selection = new SelectionModel<Supplier>(true, []);
  displayedColumns: string[] = ['select', 'name', 'email'];
  eventId: number = 0;

  constructor(private eventService: EventService,
    private supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SupplierRepositoryComponent>,
    private spinnerService: NgxSpinnerService,
    private toastService: ToastrService) {

  }

  ngOnInit(): void {
    this.eventId = this.data.eventId;
    this.getSupplierData();
  } 

  getSupplierData() {
    this.spinnerService.show();
    this.supplierService.getAllSuppliers().subscribe((result:any)=>{
      this.spinnerService.hide();
      if(result && result.length > 0) {
        result.forEach((supplier:any)=>{
          let supplier_:Supplier = {
            name: supplier.name,
            email: supplier.email,
            id: supplier.id,
            partnerName: ""
          };
          this.suppliers.push(supplier_);
        });
        this.dataSource.data = this.suppliers;
      }
      this.spinnerService.hide();
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }

  addSuppliers() {
    var selectedSuppliers = this.selection.selected;
    var selectedIds:any[] = [];
    selectedSuppliers.forEach(supplier=>{
      selectedIds.push(supplier.id);
    });
    console.log(selectedIds);
    this.spinnerService.show();
    this.eventService.addSuppliers(selectedIds, this.eventId).subscribe((result:any)=>{
      this.spinnerService.hide();
      if(result && result.length) {
        this.toastService.success("Suppliers added successfully !!")
      }
      this.dialogRef.close();
    })
  }  


}
