import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
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
import * as observableArray from "tns-core-modules/data/observable-array";
import * as labelModule from "tns-core-modules/ui/label";
import * as listViewModule from "tns-core-modules/ui/list-view";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "appointment",
    templateUrl: "appointment.component.html",
    styleUrls: ['appointment.component.css'],
    moduleId: module.id
})


export class appointmentComponent implements OnInit {

    dataUser ;
    cid ;
    nameAndsurname ;
    hospitalnumber ;
    gender ;
    dob ;
    blood ;
    appoint1 = true;
    appoint2 = false;
    loader = new LoadingIndicator();
   
    public myItems: Array<DataItem>;
    private counter: number;
    dayapp = "พุธ 14 กุมภาพันธ์ 2561 เวลา 10.30 น." ;
    medicine = [
        {
            namee : "พฤหัสบดี 15 กุมภาพันธ์ 2561",
            namet : "เวลา 09.00 น."
        },
        {
            namee : "จันทร์ 19 กุมภาพันธ์ 2561",
            namet : "เวลา 10.40 น."
        },
        {
            namee : "อังคาร 20 กุมภาพันธ์ 2561",
            namet : "เวลา 13.15 น."
        }
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

    ngOnInit(): void {
        
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
        page: Page) {
            route.url.subscribe((s:UrlSegment[]) => {
                console.log("url", s);
            });
    }

    toBack () {
        this.loader.show(this.options);
        console.log("connect");
        this.router.navigate(["/loginProfile"]);
        this.demoLoader();
    }

    private demoLoader() {
        setTimeout(() => {
          this.loader.hide();
        }, 1000);
      }

    change () {
        this.appoint1 = false;
        this.appoint2 = true;
    }

    public onItemTap2(args) {
        this.loader.show(this.options);
        console.log("------------------------ ItemTapped: " + args.index); 
        dialogs.confirm({
            title: "เลื่อนนัดแพทย์",
            message: "",
            cancelButtonText: "ตกลง",
            okButtonText: "ยกเลิก"
        }).then(result => {
            // result argument is boolean
            this.dayapp = this.medicine[args.index].namee + " " + this.medicine[args.index].namet
            this.loader.hide();
            console.log("Dialog result: " + result);
            this.loader.show(this.options);
            if(result == false){
                dialogs.confirm({
                    title: "เลื่อนนัดแพทย์",
                    message: "การเลื่อนนัดแพทย์สำเร็จ",
                    cancelButtonText: "ตกลง"
                }).then(result => {
                    // result argument is boolean
                    console.log("Dialog result: " + result);
                    // this.router.navigate(["/loginProfile"]);
                    this.appoint2 = false ;
                    this.appoint1 = true ;
                    this.demoLoader();
                });  
            }

        
        });   
    }

 }