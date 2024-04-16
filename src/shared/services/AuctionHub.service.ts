import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from '../../environment';
import { DataManagerService } from "./DataManager.service";
import { DefaultHttpClient, HttpRequest, HttpResponse } from "@microsoft/signalr";

class CustomHttpClient extends DefaultHttpClient {
    
    public override send(request: HttpRequest): Promise<HttpResponse> {
      request.headers = { ...request.headers, "Hello": "Hello1" };
      return super.send(request);
    }

}

@Injectable({
    providedIn: 'root'
})
export class AuctionHub{

    _hubConnection: signalR.HubConnection | undefined;
    constructor(private dms: DataManagerService) {
        let self = this;
        var eventId = Number(localStorage.getItem("eventId"))
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.baseUrl}auction?EventId=${eventId}`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
                // httpClient: new CustomHttpClient()
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Trace)
            .build();

        this._hubConnection.onclose(()=>{
            self._hubConnection?.start();
        });
    }

    async startHub() {
        let self = this;
        let userInfo = self.dms.getUserInfo();

        await self._hubConnection?.start().then((res:any)=>{
            let eventIdString = localStorage.getItem("eventId");
            let eventId = 0;
            if(eventIdString){
              eventId = Number(JSON.parse(eventIdString));
            }
            this._hubConnection?.invoke("AcknowledgeConnection", {
                eventId: eventId,
                userId : Number(userInfo.userId),
                connectionId: this._hubConnection.connectionId
            });
        });
    }
}

