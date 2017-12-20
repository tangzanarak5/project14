import { NgModule, ModuleWithProviders } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, RouterModule } from "@angular/router";
import { loginProfileComponent } from "./loginProfile/loginProfile.component";
import { AuthGuard } from "../security/auth-guard.service";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";
import { profileUserComponent } from "../loginAccept/profileUser/profileUser.component";

const routes: Routes = [
    { path: "loginAccept", 
    component: loginAcceptComponent,
    canActivate: [AuthGuard]
    },
    {
        path: 'loginProfile',
        component: loginProfileComponent
    },
    {
        path: 'profileUser',
        component: profileUserComponent
    }
];

export const LoginAcceptRouting: ModuleWithProviders = RouterModule.forChild(routes);