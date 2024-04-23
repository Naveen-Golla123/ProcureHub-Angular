import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MessagePanelComponent } from 'src/buyer/buyer-live/chat-box/message-panel/message-panel.component';
import { LotDetailsComponent } from 'src/buyer/create-auction/lot-details/lot-details.component';
import { AuctionHub } from 'src/shared/services/AuctionHub.service';
import { ChatService } from 'src/shared/services/ChatService.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-bid-header',
  templateUrl: './bid-header.component.html',
  styleUrls: ['./bid-header.component.scss']
})
export class BidHeaderComponent implements OnInit {
  @Input('config') config: any;
  targetDate = new Date("2024-04-15T23:37:59");
  currentDate = new Date();
  timeDifference = 0;
  timerDisplay = "00:00:00";
  timerColorRed = false;
  totalSeconds = 0;
  intervalId: any;
  enableChatNotification: boolean = false;
  userInfo: any;
  displayStatus: any;
  chatMessagesSet = new Set<number>();

  activeMessagePanel: any = {
    info: null,
    chats: [],
    isSupplier: true,
    callbacks: {
      sendMessage: (text: string) => this.sendMessage(text)
    }
  }

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<MessagePanelComponent>, private auction: AuctionHub, private toastr: ToastrService, private dms: DataManagerService, private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.config.callback["initilaizeUI"] = () => this.initilaizeUI();
    if (localStorage.getItem("UserInfo")) {
      let temp: any = localStorage.getItem("UserInfo");
      this.userInfo = JSON.parse(temp);
    }
  }

  initilaizeUI() {
    this.intervalId = setInterval(() => this.initalizeTimer(), 1000);
    this.targetDate = this.config.endDataTime;
    this.timeDifference = this.targetDate.getTime() - this.currentDate.getTime();
    this.totalSeconds = Math.floor(this.timeDifference / 1000);
    this.auction.startHub();
    this.setSignalR();
    this.setActiveSupplier();
    this.getChatData();
  }

  initalizeTimer() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = Math.floor(this.totalSeconds % 60);
    this.timerDisplay = `${this.getTwoDigits(hours)}:${this.getTwoDigits(minutes)}:${this.getTwoDigits(seconds)}`;
    this.totalSeconds--;
    if (this.totalSeconds < 300) {
      this.timerColorRed = true;
    }
    if (this.totalSeconds < 0) {
      console.log("Countdown has ended");
      clearInterval(this.intervalId);
    }
  }

  setSignalR() {
    this.auction._hubConnection?.on('recieveMessage', (message: any) => {
      if (!this.chatMessagesSet.has(message.id)) {
        this.chatMessagesSet.add(message.id);
        this.enableChatNotification = true;
        message["isSent"] = false;
        this.activeMessagePanel.chats.push(message);
        this.toastr.show(message.text, message.sentBy + " sent a message");
      }
    });
  }

  getTwoDigits(number: number) {
    return number <= 0 ? "00" : (number < 10 ? "0" + number : number);
  }

  openChatBox() {
    let dialogRef = this.dialog.open(MessagePanelComponent, {
      width: "100%",
      data: this.activeMessagePanel,
      height: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getAllLots();
    });

  }

  sendMessage(text: string) {
    console.log(text);
    var userInfo = this.dms.getUserInfo();
    this.auction._hubConnection?.invoke("SendMessage", {
      text: text,
      sentTo: this.config.createdBy,
      eventId: Number(localStorage.getItem("eventId")),
      sentBy: Number(userInfo["userId"])
    }).then(msg => {
      msg["isSent"] = true;
      this.activeMessagePanel.chats.push(msg);
    });
  }

  getChatData() {
    let eventId = Number(localStorage.getItem("eventId"));
    let userId = this.config.createdBy;
    this.activeMessagePanel.userInfo = this.config["" + userId];
    this.chatService.getChatData(eventId, userId).subscribe((res: any) => {
      this.activeMessagePanel.chats = res;
    });
  }

  setActiveSupplier() {
    console.log(this.config);
    if (this.config && this.config.length > 0) {
      this.activeMessagePanel.info = this.config[0];
    }
  }
}
