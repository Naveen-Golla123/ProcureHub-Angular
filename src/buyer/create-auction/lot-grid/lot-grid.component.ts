import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lot } from 'src/shared/models/Lot';
import { MatDialog } from '@angular/material/dialog'
import { LotDetailsComponent } from '../lot-details/lot-details.component';

@Component({
  selector: 'app-lot-grid',
  templateUrl: './lot-grid.component.html',
  styleUrls: ['./lot-grid.component.scss']
})
export class LotGridComponent {
  public lots: Lot[] = [];
  dataSource = new MatTableDataSource<Lot>();
  selection = new SelectionModel<Lot>(true, []);
  displayedColumns: string[] = ['select', 'name', 'totalPrice'];

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    for (var i = 1; i < 10; i++) {
      this.lots.push({
        name: "Supplier Name" + i,
        totalPrice: i * 100,
        description: "description",
        items: [
          {
            name: "Computer",
            basePrice: 100,
            qunatity: 2
          }
        ]
      })
    }

    this.dataSource.data = this.lots;
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

  openLotDetails() {
    let dialogRef = this.dialog.open(LotDetailsComponent, {
      width: "100%",
      data: {name: "", animal: "animalname"},
      height: "800px"
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    });
  }
}
