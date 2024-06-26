import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthEntryComponent } from "./auth-entry/auth-entry.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
    {
        path: "",
        component: AuthEntryComponent,
        children: [
            {
                path: "signin",
                component: SignInComponent,
                outlet: "AuthOutlet"
            },
            {
                path: "signup",
                component: SignUpComponent,
                outlet: "AuthOutlet"
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthRoutingModule { }