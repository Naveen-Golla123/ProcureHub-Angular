import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator"
import { Supplier } from 'src/shared/models/supplier';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {

  headerCofig: any = {
    title: "Create Auction"
  }
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  public supplierList: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();
  selection = new SelectionModel<Supplier>(true,[]);
  displayedColumns: string[] = ['select', 'name', 'partnerName', 'email'];

  constructor() {
    console.log("Hello Create Auction");
    //this.dataSource.paginator = this.paginator;
  }


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
