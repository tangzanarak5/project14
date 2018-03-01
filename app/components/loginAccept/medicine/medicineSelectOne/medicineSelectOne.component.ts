import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../../../security/security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { loginProfileService } from "../../loginProfile/loginProfile.service";
import * as wrapLayoutModule from "tns-core-modules/ui/layouts/wrap-layout";
import * as dialogs from "ui/dialogs";
import { ActivityIndicator } from "ui/activity-indicator";
import * as utils from "utils/utils";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { sideBarComponent } from "../../loginProfile/sideBar/sideBar.component";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {LoadingIndicator} from "nativescript-loading-indicator";
import {Input, ChangeDetectionStrategy} from '@angular/core';
import { diseases } from "../../../security/model/diseases.model"
import { medicineSelect } from "../../../security/model/medicineSelect.model"

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "medicineSelectOne",
    templateUrl: "medicineSelectOne.component.html",
    styleUrls: ['medicineSelectOne.component.css'],
    moduleId: module.id
})


export class medicineSelectOneComponent implements OnInit {

    public myItems: Array<DataItem>;
    private counter: number;
    medicineSelect: medicineSelect ;
    dataUser ;
    hospitalnumber ;
    loader = new LoadingIndicator();
    connect = true ;
    
    medicine = [
        {
            namee : "Metformin",
            namet : "ยาลดน้ำตาลในเลือด",
            data : "ลดการดูดซึมสารอาหารที่ลำไส้เล็กส่วนต้น และลดน้ำตาลหลังอาหาร",
            use : "เริ่มต้นขนาดน้อยใช้เพียง 25 มก พร้อมอาหาร 3 มื้อให้ปรับยาทุก 4 สัปดาห์ครั้งละ 25 มก โดยเจาะน้ำตาลหลังอาหาร 1 ชั่วโมง และขนาดยาที่ใช้หากน้ำหนักน้อยกว่า 60 กิโลกรัมให้ 50 มก พร้อมอาหารวันละ 3 ครั้ง สำหรับผู้ที่น้ำหนักมากกว่า60 กก ใช้ 100 มก พร้อมอาหารวันละ 3 ครั้ง",
            type : "เบาหวาน"
        },
        {
            namee : "ACE Inhibitor",
            namet : "ยาลดความดันโลหิต",
            data : "ขยายหลอด ลดอาการเหนื่อยจากหัวใจวาย ลดการกระตุ้น angiotensin II",
            use : "รับประทานวันละ 1 ครั้ง ตอนเช้า หากต้องรับประทานวันละ 2 ครั้ง ควรรับประทาน ตอนเช้า และกลางวัน",
            type : "ความดันโลหิต"
        },
        {
            namee : "Repaglinide",
            namet : "ยาเพิ่มการหลั่งของอินซูลิน",
            data : "กระตุ้นตับอ่อนให้สร้างอินซูลินทำให้น้ำตาลหลังอาหารลดลง",
            use : "สำหรับผู้ที่ไม่เคยรับยามาก่อน HbA1c < 8% ให้เริ่มขนาด 0.5 ก่อนอาหาร 3 มื้อ หากผู้ที่เคยรับยาเบาหวานมาก่อน HbA1c  > 8% ให้เริ่มขนาด 1-2 มก ก่อนอาหาร 3 มื้อ ขนาดเต็มที่ 4 มก ก่อนอาหาร 3 มื้อ",
            type : "เบาหวาน"
        },
        {
            namee : "Vitamin-E",
            namet : "วิตามินอี",
            data : "ลดการเกาะตัวของไขมันในผนังหลอดเลือด",
            use : "รับประทานทั่วไปคือ 200-1,200 IU ต่อวัน",
            type : "ไขมัน"
        },
        {
            namee : "Vitamin-C",
            namet : "วิตามินซี",
            data : "ลดความดันโลหิต",
            use : "รับประทานพร้อมอาหาร ผู้ใหญ่ทานวันละ 1 เม็ด",
            type : "ความดันโลหิต"
        },
        {
            namee : "Vitamin-B3",
            namet : "วิตามินบี  3",
            data : "ควบคุมระดับไขมันในร่างกายให้เป็นปกติ ควบคุมไม่ให้ cholesterol สูงเกินปกติ",
            use : "รับประทาน 1 - 3 เม็ดต่อวัน",
            type : "ความดันโลหิต"
        }
    ] ;
    
    medicineNumber ;

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

    openDrawer () {
        this.sideBar.openDrawer();
    }

    ngOnInit(): void {
        this.medicineSelect = new medicineSelect ;
        this.medicineSelect = JSON.parse(securityService.getMedicineSelect);
        console.log(securityService.getMedicineSelect);
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        
        if (this.medicineSelect.name == "ยาลดน้ำตาลในเลือด") {
            this.medicineNumber = 0 ;
        }
        else if (this.medicineSelect.name == "ยาลดความดันโลหิต") {
            this.medicineNumber = 1 ;
        }
        else if (this.medicineSelect.name == "ยาเพิ่มการหลั่งของอินซูลิน") {
            this.medicineNumber = 2 ;
        }
        else if (this.medicineSelect.name == "วิตามินอี") {
            this.medicineNumber = 3 ;
        }
        else if (this.medicineSelect.name == "วิตามินซี") {
            this.medicineNumber = 4 ;
        }
        else if (this.medicineSelect.name == "วิตามินบี  3") {
            this.medicineNumber = 5 ;
        }
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
public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
}
    toBack () {
        console.log("connect");
        this.router.navigate(["/medicineSelect"]);
    }

 }