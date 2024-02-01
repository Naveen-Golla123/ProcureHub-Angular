import { Injectable  } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

    constructor(private router: Router,private route_: ActivatedRoute) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // check for authentication from local storage.
        let isAuthorized = false;
        if(isAuthorized) {
            return true;
        } else {
            this.router.navigate(['/auth'], {relativeTo: this.route_.parent})
            return false;
        }
    }
}