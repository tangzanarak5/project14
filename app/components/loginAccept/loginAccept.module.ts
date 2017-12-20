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
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { profileUserComponent } from "../loginAccept/profileUser/profileUser.component";

@NgModule({

    imports: [
        NativeScriptModule,
        LoginAcceptRouting,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
          })
    ],
    declarations: [
        loginProfileComponent,
        loginAcceptComponent,
        sideBarComponent,
        profileUserComponent
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
