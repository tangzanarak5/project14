import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import {Input, ChangeDetectionStrategy} from '@angular/core';

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "cost",
    templateUrl: "cost.component.html",
    styleUrls: ['cost.component.css'],
    moduleId: module.id
})


export class costComponent implements OnInit {
    public myItems: Array<DataItem>;
    private counter: number;
    dataUser ;
    hospitalnumber ;
    medicineNumber ;
    loader = new LoadingIndicator();
    connect = true ;
    medicine = [
        {
            date : "27/01/2560",
            type : "ความดันโลหิต"
        },
        {
            date : "2/12/2559",
            type : "ไขมัน"
        },
        {
            date : "14/5/2559",
            type : "เบาหวาน"
        },
    ] ;

    options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
          indeterminate: true,
          cancelable: true,
          cancelListener: function(dialog) { console.log("Loading cancelled") },
          max: 100,
          progressNumberFormat: "%1d/%2d",
          progressPercentFormat: 0.53,
          progressStyle: 1,
          secondaryProgress: 1
        },
        ios: {
          details: "Additional detail note!",
          margin: 10,
          dimBackground: true,
          color: "#4B9ED6", // color of indicator and labels
          // background box around indicator
          // hideBezel will override this if true
          backgroundColor: "yellow",
          userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
          hideBezel: true, // default false, can hide the surrounding bezel
        }
      };

    @ViewChild('sidebar') sideBar: sideBarComponent

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
        this.medicineNumber = args.index ;
        this.connect = false
    }

    openDrawer () {
        this.sideBar.openDrawer();
    }

    ngOnInit(): void {
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
    }

    constructor(
        private fonticon: TNSFontIconService,
        private _changeDetectionRef: ChangeDetectorRef,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private loginProfileService: loginProfileService,
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }
    toBack () {
        console.log("connect");
        this.router.navigate(["/loginProfile"]);
    }

    getCost () {
        this.connect = false ;
    }

 }