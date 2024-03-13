import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Item, Lot } from 'src/shared/models/Lot';
import { LotService } from 'src/shared/services/LotService.service';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.scss']
})
export class LotDetailsComponent implements OnInit {
  public isNewLot: boolean = true;
  public lotItems: Item[] = [];
  public UiItemsCounter: number = 0;
  public lot: Lot;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LotDetailsComponent>,
    private toastService: ToastrService,
    private lotService: LotService) {
    this.lot = { id: 0, name: '', description: '', totalPrice: 0, items: [] }
  }

  ngOnInit(): void {
    if (this.data) {
      this.lot = this.data;
      this.isNewLot = this.lot.id == 0 ? true : false;
    } else {
      this.isNewLot = true;
    }
    this.initalizeLot();
  }

  initalizeLot() {
    if (this.isNewLot) {
      this.lot.name = "";
      this.lot.description = "";
      this.lot.items = []
    } else {
      this.lot = this.data;
    }
    this.setCallbacks();
  }

  setCallbacks() {
    if (this.data.items) {
      this.data.items.forEach((item: any) => {
        item["UiId"] = this.UiItemsCounter++,
          item["callback"] = {
            deleteItem: (element: any) => this.deleteItem(element)
          }
      })
    }
  }

  configChange(item: any) {
    console.log("Hello Item")
  }

  addItem() {
    let newItem: Item = {
      name: "",
      basePrice: 0,
      quantity: 0,
      _id: 0,
      UiId: this.UiItemsCounter++,
      callback: {
        deleteItem: (element: any) => this.deleteItem(element)
      }
    };
    if(this.lot.items){
      this.lot.items.push(newItem);
    } else {
      this.lot.items = [];
      this.lot.items.push(newItem);
    }
    
  }

  onItemChange() {
    console.log("Item Changed")
  }

  async deleteItem(item: any) {
    console.log(item);
    var index = this.lot.items.findIndex((i: any) => { return i.UiId == item.UiId });
    this.lot.items.splice(index, 1);
    if (item._id != 0) {
      await this.lotService.deleteItem(item._id).toPromise();
    }
    this.toastService.success(`${item.name} item deleted successfully`);
  }

  saveLot() {
    this.lotService.saveLot(this.lot).subscribe(result => {
      console.log(result);
      this.toastService.success(`Lot Saved Successfully`);
      this.dialogRef.close();
    });
  }
}
