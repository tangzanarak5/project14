import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, RouterModule } from "@angular/router";
import { loginProfileComponent } from "./loginProfile/loginProfile.component";
import { AuthGuard } from "../security/auth-guard.service";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";

const routes: Routes = [
    { path: "loginAccept", 
    component: loginAcceptComponent,
    canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class LoginAcceptRouting { }