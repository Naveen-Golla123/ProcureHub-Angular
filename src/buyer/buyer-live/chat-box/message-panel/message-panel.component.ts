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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<MessagePanelComponent>) {

  }

  ngOnInit(): void {
    if(this.data && this.data.isSupplier){
      this.config = this.data;
    }
  }

  sendMessage(){
    if(this.config.callbacks.sendMessage && this.textMessage != "") {
      this.config.callbacks.sendMessage(this.textMessage);
      this.textMessage = "";
    } 
  }

}
