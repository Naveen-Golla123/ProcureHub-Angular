import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-header',
  templateUrl: './bid-header.component.html',
  styleUrls: ['./bid-header.component.scss']
})
export class BidHeaderComponent implements OnInit {
  @Input('config') config: any;
  // <a href="https://www.squash.io/how-to-set-time-delay-in-javascript/">Set the target date and time</a> for the countdown
  targetDate = new Date("2024-03-31T23:37:59");

  // Get the current date and time
  currentDate = new Date();

  // Calculate the time difference between the target date and the current date
  timeDifference = 0;

  timerDisplay="00:00:00";
  timerColorRed = false;

  // Convert the time difference to seconds
  totalSeconds = 0;
  intervalId:any;

  constructor() {

  }

  ngOnInit(): void {
    this.intervalId = setInterval(()=>this.initalizeTimer(), 1000);
    this.timeDifference = this.targetDate.getTime() - this.currentDate.getTime();
    this.totalSeconds = Math.floor(this.timeDifference / 1000);
    
  }

  initalizeTimer() {
    // Calculate the remaining hours, minutes, and seconds
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = Math.floor(this.totalSeconds % 60);

    // Display the countdown timer
    this.timerDisplay = `${this.getTwoDigits(hours)}:${this.getTwoDigits(minutes)}:${this.getTwoDigits(seconds)}`;

    // Decrease the totalSeconds by 1
    this.totalSeconds--;
    if(this.totalSeconds < 300){
      this.timerColorRed = true;
    }
    // Check if the countdown has reached zero
    if (this.totalSeconds < 0) {
      console.log("Countdown has ended");
      clearInterval(this.intervalId);
    }
  }

  getTwoDigits(number: number) {
    return number <= 0 ? "00" : (number < 10 ? "0" + number : number);
  }

  // Call the updateCountdown function every second
  
}
