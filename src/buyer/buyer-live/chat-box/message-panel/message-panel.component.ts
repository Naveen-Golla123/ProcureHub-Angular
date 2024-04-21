import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {

  @Input('config') config: any;
  textMessage: string = ""
  isSupplierSide = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<MessagePanelComponent>) {

  }

  ngOnInit(): void {
    if(this.data && this.data.isSupplier){
      if(localStorage.getItem("UserInfo")){
        let temp:any = localStorage.getItem("UserInfo");
        var userInfo = JSON.parse(temp);
      }
      this.config = this.data;
      this.config.info = {
        name : userInfo.name
      };
      this.isSupplierSide = true;
    }
  }

  sendMessage(){
    if(this.config.callbacks.sendMessage && this.textMessage != "") {
      this.config.callbacks.sendMessage(this.textMessage);
      this.textMessage = "";
    } 
  }

}
