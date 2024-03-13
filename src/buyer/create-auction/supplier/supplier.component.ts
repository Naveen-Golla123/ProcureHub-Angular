import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/shared/models/supplier';
import { SupplierRepositoryComponent } from '../supplier-repository/supplier-repository.component';
import { EventService } from 'src/shared/services/EventService.service';
import { LotDetailsComponent } from '../lot-details/lot-details.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{
  public supplierList: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();
  selection = new SelectionModel<Supplier>(true, []);
  displayedColumns: string[] = ['select', 'name', 'partnerName', 'email'];
  @Input('eventId') eventId: any;
  @Input("readOnly") readOnly: any;

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<LotDetailsComponent>,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    for (var i = 1; i < 10; i++) {
      this.supplierList.push({
        name: "Supplier Name" + i,
        partnerName: "PartnerName" + i,
        email: "email" + i,
        id: 0
      })
    }
    this.getAddedSuppliers();
    this.dataSource.data = this.supplierList;
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

  openSupplierRepository() {
    let dialogRef = this.dialog.open(SupplierRepositoryComponent, {
      width: "100%",
      data: {eventId : this.eventId},
      height: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAddedSuppliers();
      // this.getAllLots();
    });
  }

  getAddedSuppliers() {
    this.eventService.getAddedSuppliers(this.eventId).subscribe(result=>{
      this.processData(result);
    })
  }

  processData(data:any) {
    this.supplierList = [];
    if(data && data.length > 0 ) {
      data.forEach((supplier:any)=>{
        var supplier_:Supplier = {
          name : supplier.name,
          id: supplier.id,
          partnerName: " ",
          email: supplier.email
        }
        this.supplierList.push(supplier_)
      });
      this.dataSource.data = this.supplierList;
    }
  }

}
