import { Injectable  } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { DataManagerService } from "./DataManager.service";
import { jwtDecode  } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

    constructor(private router: Router,private route_: ActivatedRoute
        ,private dataManagerService: DataManagerService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // check for authentication from local storage.
        if(this.isAuthorized()) {

            if(state.url == '/') {
                // check for the user and redirect to respective home page.
                // let routeStr = 
                this.router.navigate(['/buyerHome'], {relativeTo: this.route_.parent});
                return false;
            }
            return true;
        } else {
            this.router.navigate(['/auth'], {relativeTo: this.route_.parent})
            return false;
        }
    }

    isAuthorized() {
        let token = this.dataManagerService.getToken();
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp && decodedToken.exp > currentTime) {
              return true;
            }
        }
        return false;
    }
}