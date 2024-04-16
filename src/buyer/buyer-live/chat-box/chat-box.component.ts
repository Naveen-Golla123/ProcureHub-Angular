import { Component, Input, OnInit } from '@angular/core';
import { AuctionHub } from 'src/shared/services/AuctionHub.service';
import { ChatService } from 'src/shared/services/ChatService.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input('config') config: any;
  @Input("getData") getData: any;

  Chats: Map<string, any[]> = new Map<string, any[]>();

  activeMessagePanel: any = {
    info: null,
    chats: [],
    callbacks: {
      sendMessage: (text: string) => this.sendMessage(text)
    }
  }

  constructor(private auctionHub: AuctionHub, private dms: DataManagerService, private chatService: ChatService) {

  }
  ngOnInit(): void {
    this.setActiveSupplier();
    this.getChatData();
    this.setSignalR();
  }

  sendMessage(text: string) {
    console.log(text);
    let userId = this.activeMessagePanel.info["id"];
    var userInfo = this.dms.getUserInfo();
    this.auctionHub._hubConnection?.invoke("SendMessage", {
      text: text,
      sentTo: Number(userId),
      eventId: Number(localStorage.getItem("eventId")),
      sentBy: Number(userInfo["userId"])
    }).then(msg => {
      msg["isSent"] = true;
      this.activeMessagePanel.chats.push(msg);
    });
  }

  setSignalR() {
    this.auctionHub._hubConnection?.on('recieveMessage', (message:any)=>{
      message["isSent"] = false;
      this.activeMessagePanel.chats.push(message);
      //this.toastr.show(message.text, message.sentBy + " sent a message");
    });
  }

  getChatData() {
    let eventId = Number(localStorage.getItem("eventId"));
    // let suppliers = Object.keys(this.config);
    let userId = this.activeMessagePanel.info["id"];
    this.activeMessagePanel.userInfo = this.config[""+userId];
    this.chatService.getChatData(eventId, userId).subscribe((res: any) => {
      console.log(res);
      this.activeMessagePanel.chats = res;
    });
  }

  setActiveSupplier() {
    console.log(this.config);
    if(this.config && Object.keys(this.config).length > 0 ){
      this.activeMessagePanel.info = this.config[Object.keys(this.config)[0]];
    }
  }

  contactClicked(value: any) {
    console.log(value);
    this.activeMessagePanel.info = value.value;
    this.getChatData();
  }
}
