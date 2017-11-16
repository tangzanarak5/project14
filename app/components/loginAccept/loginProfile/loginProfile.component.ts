import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "./loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
@Component({
    selector: "loginProfile",
    templateUrl: "loginProfile.component.html",
    styleUrls: ['loginProfile.component.css'],
    moduleId: module.id
})

export class loginProfileComponent implements OnInit {

    dataUser ;
    nameAndsurname ;
    hospitalnumber ;

    ngOnInit(): void {
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(JSON.stringify(this.dataUser.dataset));
        console.log(this.dataUser.dataset.hn)
        this.nameAndsurname = this.dataUser.dataset.fname + " " + this.dataUser.dataset.lname
        this.hospitalnumber = this.dataUser.dataset.hn
    }

    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private loginProfileService: loginProfileService,
        page: Page) {
            page.actionBarHidden = true;
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    logout () {
        securityService.setIsLogin = "";
        this.router.navigate(["/security/standbytologin"]);
    }

 }