import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from '../../environment';
@Injectable({
    providedIn: 'root'
})
export class AuctionHub {

    _hubConnection: signalR.HubConnection | undefined;

    constructor() {
        let self = this;
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.baseUrl}auction`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Trace)
            .build();


        this._hubConnection.onclose(()=>{
            self._hubConnection?.start();
        });
    }

    async startHub() {
        await this._hubConnection?.start();
    }



}