import { NgModule, ModuleWithProviders } from "@angular/core";
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

export const FeedRouting: ModuleWithProviders = RouterModule.forChild(routes);