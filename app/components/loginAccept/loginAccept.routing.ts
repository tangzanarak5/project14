import { NgModule, ModuleWithProviders } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, RouterModule } from "@angular/router";
import { loginProfileComponent } from "./loginProfile/loginProfile.component";
import { AuthGuard } from "../security/auth-guard.service";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";
import { profileUserComponent } from "../loginAccept/profileUser/profileUser.component";
import { bloodResultComponent } from "../loginAccept/bloodResult/bloodResult.component";
import { costComponent } from "../loginAccept/cost/cost.component";
import { medicineComponent } from "../loginAccept/medicine/medicine.component";
import { appointmentComponent } from "../loginAccept/appointment/appointment.component";
import { barCodeComponent } from "../loginAccept/loginProfile/barCode.component";
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
    },
    {
        path: 'bloodResult',
        component: bloodResultComponent
    },
    {
        path: 'cost',
        component: costComponent
    },
    {
        path: 'medicine',
        component: medicineComponent
    },
    {
        path: 'appointment',
        component: appointmentComponent
    },
    {
        path: 'barCode',
        component: barCodeComponent
    }


];

export const LoginAcceptRouting: ModuleWithProviders = RouterModule.forChild(routes);