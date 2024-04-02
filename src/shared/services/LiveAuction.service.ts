import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { DataManagerService } from "./DataManager.service";

@Injectable({
    providedIn: 'root'
})
export class LiveAuctionService {
    constructor(private httpService: HttpClient, private dms: DataManagerService){

    }

    getSupplierDashBoardDate(eventId: number) {
        let url = environment.baseUrl + `api/live/getsupplierdashboarddata/${eventId}`;
        return this.httpService.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dms.getToken()}`
            }
        }
        )
    }
}