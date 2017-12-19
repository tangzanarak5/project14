import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { LoginAcceptRouting } from "../loginAccept/loginAccept.routing";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";
import { loginProfileComponent } from "../loginAccept/loginProfile/loginProfile.component";
import { loginProfileService } from "../loginAccept/loginProfile/loginProfile.service";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { sideBarComponent } from "../loginAccept/loginProfile/sideBar/sideBar.component";

@NgModule({

    imports: [
        NativeScriptModule,
        LoginAcceptRouting,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        loginProfileComponent,
        loginAcceptComponent,
        sideBarComponent
    ],
    providers: [
        ModalDialogService,
        loginProfileService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class loginAcceptModule { }
