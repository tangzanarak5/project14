import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "./loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import * as activityIndicatorModule from "tns-core-modules/ui/activity-indicator";

@Component({
    selector: "loginProfile",
    templateUrl: "loginProfile.component.html",
    styleUrls: ['loginProfile.component.css'],
    moduleId: module.id
})


export class loginProfileComponent implements OnInit {

    dataUser ;
    cid ;
    nameAndsurname ;
    hospitalnumber ;
    gender ;
    dob ;
    blood ;
    isLoading = true ;

    @ViewChild('sidebar') sideBar: sideBarComponent

    openDrawer () {
        this.sideBar.openDrawer();
    }

    ngOnInit(): void {
        if (securityService.getDataUser == "") {this.router.navigate(["/security/standbytologin"]);}
        this.dataUser = JSON.parse(securityService.getDataUser);
        console.log(JSON.stringify(this.dataUser.dataset));
        console.log(this.dataUser.dataset.hn)
        this.nameAndsurname = this.dataUser.dataset.fname + " " + this.dataUser.dataset.lname
        this.hospitalnumber = this.dataUser.dataset.hn
        this.cid = this.dataUser.dataset.cid
        this.gender = "เพศ " + this.dataUser.dataset.gender
        this.dob = "วันเกิด " + this.dataUser.dataset.dob
        if (this.dataUser.dataset.blood == null) {
            this.blood = "เลือด -"
        }
        else {this.blood = "เลือด " + this.dataUser.dataset.blood}
    }

    constructor(
        private fonticon: TNSFontIconService,
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

    tobeContinue () {
        alert("เมนูนี้ยังไม่เปิดให้ใช้บริการ");
    }

    toProfileUser () {
        this.isLoading = false;
        console.log("connect");
        this.router.navigate(["/profileUser"]);
    }

    toHome () {
        console.log("connect");
        this.router.navigate(["/loginProfile"]);
    }

    news () {

        utils.openUrl("https://newsbhu.firebaseapp.com/#/")
    }
    web () {
        
                utils.openUrl("https://www.cpa.go.th//#/")
            }

    logout () {
        dialogs.confirm({
            title: "ออกจากระบบ",
            cancelButtonText: "ตกลง",
            okButtonText: "ยกเลิก"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result == false) {
                this.isLoading = false ;
                securityService.setIsLogin = ""
                securityService.setDataUser = ""
                this.router.navigate(["/security/standbytologin"]);
            }
        });  
    }

 }