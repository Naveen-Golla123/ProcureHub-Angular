import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lot } from 'src/shared/models/Lot';
import { MatDialog } from '@angular/material/dialog';
import { LotDetailsComponent } from '../lot-details/lot-details.component';
import { LotService } from 'src/shared/services/LotService.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';
import { ToastrService } from 'ngx-toastr';
import { SupplierRepositoryComponent } from '../supplier-repository/supplier-repository.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lot-grid',
  templateUrl: './lot-grid.component.html',
  styleUrls: ['./lot-grid.component.scss']
})
export class LotGridComponent {
  public lots: Lot[] = [];
  dataSource = new MatTableDataSource<Lot>();
  selection = new SelectionModel<Lot>(true, []);
  displayedColumns: string[] = ['select', 'name', "edit"];
  @Input('eventId') eventId: any;
  @Input("readOnly") readOnly: any;

  constructor(private dialog: MatDialog,
    private toastService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private lotService: LotService, private dms: DataManagerService) {
    // this.eventId = this.dms.getDataStoreValue("eventId");
  }

  ngOnInit(): void {
    let self = this;
    self.getAllLots();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }

  openLotDetails(data: any) {
    let dialogRef = this.dialog.open(LotDetailsComponent, {
      width: "100%",
      data: data,
      height: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllLots();
    });
  }


  addLot() {
    this.openLotDetails(null);
  }

  async deleteLot() {
     var selectedLots: any[] = [];
     await this.selection.selected.forEach((lot:any)=>{
        selectedLots.push(lot.id);
     })
     this.spinnerService.show();
     this.lotService.deleteLot(selectedLots).subscribe((result:any)=>{
        this.toastService.success("Lots deleted successfully!!");
        this.getAllLots();
        this.spinnerService.hide();
     });
  }

  processLotData(result: any) {
    let self = this;
    this.lots = [];
    if (result) {
      result.forEach((lot_: any) => {
        self.lots.push({
          name: lot_.name,
          description: lot_.description,
          totalPrice: 0,
          items: lot_.has_item,
          id: lot_._id
        })
      })
    }
    this.dataSource.data = this.lots;
  }

  editLot(element: Lot) {
    if (element) {
      this.openLotDetails(element);
    }
  }

  getAllLots() {
    let self = this;
    this.spinnerService.show();
    this.lotService.getAllLots(this.eventId).subscribe(result => {
      console.log(result);
      self.processLotData(result);
      this.spinnerService.hide();
    });
  }

}
