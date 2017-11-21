import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { user } from "../model/user.model"
import * as datePickerModule from "tns-core-modules/ui/date-picker";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { formDateComponent } from "../formProfileRecord/formDate.component";
import { securityService } from "../security.service";
import * as activityIndicatorModule from "tns-core-modules/ui/activity-indicator";

@Component({
    selector: "formProfileRecord",
    templateUrl: "formProfileRecord.component.html",
    styleUrls: ['formProfileRecord.component.css'],
    moduleId: module.id
})

export class formProfileRecordComponent implements OnInit {
    
    user: user;
    birthday: Date;
    editableNation = true;
    editableReligion = true;
    showBirthDay = "" ;
    inputAlret = "";
    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        page: Page
    ) { page.actionBarHidden = true;}

ngOnInit(): void {
    this.user = new user();
    console.log(securityService.getUserData);
    this.user = JSON.parse(securityService.getUserData);
    // this.user.birthDay = new Date() ;
    //this.user.idCard = this.route.snapshot.params["idCard"]
}

getDate(dateStr){
    let date = new Date(dateStr);
    let dateFormat= [date.getDate(), date.getMonth() + 1 , date.getFullYear()].join('-');
    return(dateFormat);
}

public showModal() {
    console.log("hello");
    let options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    this.modal.showModal(formDateComponent, options).then(res => {
        this.birthday = new Date(res) ;
        this.showBirthDay = this.getDate(this.birthday);
        this.user.birthDay = this.showBirthDay;
    });
}
    
nameTitleActionDialog() {
        
        let options = {
            title: "คำนำหน้าชื่อ",
            message: "เลือก",
            cancelButtonText: "",
            actions: ["นาย", "นาง","นางสาว","เด็กชาย","เด็กหญิง"]
        };
        let tm = this
        action(options).then((result) => {
            tm.user.nameTitle = result;
            console.log(tm.user.nameTitle);
            if(tm.user.nameTitle == "นาย" || tm.user.nameTitle == "เด็กชาย"){
                tm.user.gender = "ชาย"
            }
            else{
                tm.user.gender = "หญิง"
            }
        });  
    }

genderActionDialog() {

    let options = {
        title: "เพศ",
        message: "เลือก",
        cancelButtonText: "",
        actions: ["ชาย", "หญิง"]
    };
    let tm = this
    action(options).then((result) => {
        tm.user.gender = result;
        console.log(tm.user.gender);
    });
}
nationActionDialog() {
    let options = {
        title: "สัญชาติ",
        message: "เลือก",
        cancelButtonText: "",
        actions: ["ไทย","อื่น ๆ"]
    };
    let tm = this
    action(options).then((result) => {
        if (result == "อื่น ๆ") {
            tm.user.nation = "";
            tm.editableNation = true;
        }
        else {
            tm.user.nation = result;
            tm.editableNation = false;
        }
        console.log(tm.user.nation);
    });  
}
religionActionDialog() {
    let options = {
        title: "ศาสนา",
        message: "เลือก",
        cancelButtonText: "",
        actions: ["พุทธ","คริส","อิสลาม","อื่น ๆ"]
    };
    let tm = this
    action(options).then((result) => {
        if (result == "อื่น ๆ") {
            tm.user.religion = "";
            tm.editableReligion = true;
        }
        else {
            tm.user.religion = result;
            tm.editableReligion = false;
        }
        console.log(tm.user.religion);
    });  
}
nextToAddress () {
        if (this.user.nameTitle == undefined || this.user.nameTitle == "" || this.user.nameTitle == null) {
        this.inputAlret = this.inputAlret + "\n- คำนำหน้าชื่อ"
        }
        if (this.user.name == undefined || this.user.name == "" || this.user.name == null) {
            this.inputAlret = this.inputAlret + "\n- ชื่อ "
            }
        if (this.user.surname == undefined || this.user.surname == "" || this.user.surname == null) {
            this.inputAlret = this.inputAlret + "\n- นามสกุล "
        }
        if (this.user.gender == undefined || this.user.gender == "" || this.user.gender == null) {
            this.inputAlret = this.inputAlret + "\n- เพศ "
        }
        if (this.showBirthDay == "") {this.inputAlret = this.inputAlret + "วันเกิด "}
        if (this.user.nation == undefined || this.user.nation == "" || this.user.nation == null) {
            this.inputAlret = this.inputAlret + "\n- สัญชาติ "
        }
        if (this.user.religion == undefined || this.user.religion == "" || this.user.religion == null) {
            this.inputAlret = this.inputAlret + "\n- ศาสนา "
        }
        if (this.inputAlret != "") {
            alert("กรุณาใส่ข้อมูลให้ครบ !\n" + this.inputAlret);
        }
        if (this.inputAlret == ""){
            securityService.setUserData = JSON.stringify(this.user);
            this.router.navigate(["/security/formAddressRecord"]);
        }
        this.inputAlret = "";
    }

    net () {
        securityService.setUserData = JSON.stringify(this.user);
        this.router.navigate(["/security/formAddressRecord"]);
    }
 }