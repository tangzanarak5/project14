import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"

@Component({
    selector: "formRelativeAndMedicalAndSymptomRecord",
    templateUrl: "formRelativeAndMedicalAndSymptomRecord.component.html",
    styleUrls: ['formRelativeAndMedicalAndSymptomRecord.component.css'],
    moduleId: module.id
})

export class formRelativeAndMedicalAndSymptomRecordComponent implements OnInit {
    user: user ;
    symptom = "อาการหรือโรคที่ต้องการตรวจ\n\n* ตัวอย่าง \n - ปวดหัว \n - ตัวร้อน \n - เจ็บคอ \n - เป็นเมื่อวันที่ 29/10/2560";
    inputAlret = ""; 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        page: Page
    ) { page.actionBarHidden = true;}

    ngOnInit(): void {
        this.user = new user();
        console.log(securityService.getUserData);
        this.user = JSON.parse(securityService.getUserData);
}

net () {
    securityService.setUserData = JSON.stringify(this.user);
    this.router.navigate(["/security/formPicAndAccept"]);
}
    nextTomedicalEligibilityVerification () {
        if (this.user.medicalEligibilityVerification == "") {
            this.inputAlret = this.inputAlret + "\n- สิทธิการรักษา"
        }
        if (this.user.symptom == "") {
            this.inputAlret = this.inputAlret + "\n- อาการหรือโรค "
        }
        if (this.user.nameRelative == "") {
            this.inputAlret = this.inputAlret + "\n- ชื่อ"
        }
        if (this.user.surnameRelative == "") {
            this.inputAlret = this.inputAlret + "\n- นามสกุล "
        }
        if (this.user.contact == "") {
            this.inputAlret = this.inputAlret + "\n- เกี่ยวข้องเป็น... "
        }
        if (this.user.telephoneRelative == "") {
            this.inputAlret = this.inputAlret + "\n- โทรศัพท์ "
        }
        if (this.inputAlret != "") {
            alert("กรุณาใส่ข้อมูลให้ครบ !\n" + this.inputAlret);
        }
        if (this.inputAlret == ""){
            securityService.setUserData = JSON.stringify(this.user);
            this.router.navigate(["/security/formPicAndAccept"]);
        }
        this.inputAlret = "";
    }

    rightToTreatmentActionDialog() {
        let options = {
            title: "สิทธิการรักษา",
            message: "เลือก",
            cancelButtonText: "",
            actions: ["ชำระเงินเอง","เบิกได้ (รับราชการ)","บัตรประกันสังคม","บัตรประกันสุขภาพถ้วนหน้า (บัตรทอง)"]
        };
        let vm = this
        action(options).then((result) => {
            vm.user.medicalEligibilityVerification = result;
            console.log(vm.user.medicalEligibilityVerification);
        });
    }
}