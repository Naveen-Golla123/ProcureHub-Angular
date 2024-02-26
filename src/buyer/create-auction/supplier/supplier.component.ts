import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/shared/models/supplier';

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


  ngOnInit(): void {
    for (var i = 1; i < 10; i++) {
      this.supplierList.push({
        name: "Supplier Name" + i,
        partnerName: "PartnerName" + i,
        email: "email" + i
      })
    }

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

}
