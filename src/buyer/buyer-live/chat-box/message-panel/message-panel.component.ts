import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {

  @Input('config') config: any;
  textMessage: string = ""

  constructor() {

  }

  ngOnInit(): void {
  }



  sendMessage(){
    if(this.config.callbacks.sendMessage) {
      this.config.callbacks.sendMessage(this.textMessage);
      this.textMessage = "";
    } 
  }



}
