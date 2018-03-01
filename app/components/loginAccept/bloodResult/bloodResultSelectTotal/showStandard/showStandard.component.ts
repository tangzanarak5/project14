import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../../../security/security.service";
import { standard } from "../../../../security/model/standard.model"
@Component({
    selector: "my-modal",
    templateUrl: "showStandard.component.html",
    styleUrls: ['showStandard.component.css'],
    moduleId: module.id
})
export class showStandardComponent {
    dataUser ;
    standard: standard ;
    public frameworks: Array<string>;
    dataStandard = [
        {
            dataText: "   ค่าปกติอยู่ระหว่าง 70 -100 mg/dL ค่าอยู่ระหว่า 100-125 mg/dLจะถือว่าเป็นภาวะimpaired fasting glucose หรือกลุ่มที่เสี่ยงต่อการเกิดโรคเบาหวาน น้ำตาลที่มากกว่า 126 mg/dL จะวินิจฉัยว่าเป็นโรคเบาหวาน"
        },
        {
            dataText: "   ค่าปกติผู้ไม่เป็นเบาหวาน Hb A1c น้อยกว่า 5.7 mg% ผู้มีความเสี่ยงเป็นเบาหวาน Hb A1c 5.7 mg% ถึง 6.4 mg% ผู้เป็นเบาหวาน Hb A1c มากกว่าหรือเท่ากับ 6.5 mg%"
        },
        {
            dataText: "   ค่า HDL 0-30 mg/dL = น้อยเกินไป ค่า HDL 40-60 mg/dL = ค่าที่เหมาะสม ค่า HDL 60 mg/dL ขึ้นไป = สูง"
        },
        {
            dataText: "   ค่า LDL น้อยกว่า100 mg/dl = พอดี ค่า LDL 100 – 129 mg/dl = เกินพอดี ค่า LDL 130-159 mg/dl = สูงคาบเส้น ค่า LDL 160-189 mg/dl = สูง ค่า LDL 190 mg/dl = สูงมาก"
        },
        {
            dataText: "   ผู้มีแนวโน้มจะเป็นโรคความดันโลหิตสูง คือ 120 - 139 / 80 - 89 มม.ปรอท โรคความดันโลหิตสูงระยะ 1 คือ 140 - 159 / 90 - 99 มม.ปรอท โรคความดันโลหิตสูงระยะ 2 คือ ตั้งแต่ 160/100 มม.ปรอทขึ้นไป โรคความดันโลหิตสูงที่ต้องพบแพทย์ใน 24 ชั่วโมง คือ สูงตั้งแต่ 180/ 110 มม.ปรอทเป็นต้นไป โรคความดันโลหิตสูงที่ต้องพบแพทย์ฉุกเฉิน คือสูงตั้งแต่ 220/140 มม.ปรอทขึ้นไป"
        },
        {
            dataText: "   ชีพจรปกติ คือ ประมาณ 60-100 ครั้งต่อนาที"
        }
    ] ;
    i ;
    public constructor(private params: ModalDialogParams) {   
    }
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.standard = JSON.parse(securityService.getStandard);
        console.log(securityService.getStandard);

        if (this.standard.name == "ระดับน้ำตาลในเลือด") {
            this.i = 0 ;
        }
        else if (this.standard.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            this.i = 1 ;
        }
        else if (this.standard.name == "คอเลสเตอรอลที่ดี") {
            this.i = 2 ;
        }
        else if (this.standard.name == "ไขมันไม่ดี") {
            this.i = 3 ;
        }
        else if (this.standard.name == "ความดันโลหิต") {
            this.i = 4 ;
        }
        else if (this.standard.name == "ชีพจร") {
            this.i = 5 ;
        }
    }
    public close(res: Date) {
        this.params.closeCallback(res);
    }

}