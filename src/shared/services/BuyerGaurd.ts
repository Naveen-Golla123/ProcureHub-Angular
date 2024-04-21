import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataManagerService } from "./DataManager.service";

@Injectable({
    providedIn: 'root'
})
export class BuyerGaurd implements CanActivate {

    constructor(private router: Router,private route_: ActivatedRoute
        ,private dataManagerService: DataManagerService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        var userInfo = this.dataManagerService.getUserInfo();
        if (userInfo && userInfo.isSupplier != 'True') {
            return true;
        } else {
            this.dataManagerService.clearToken();
            this.router.navigate(['/auth'], {relativeTo: this.route_.parent})
            return false;
        }
    }
    
}