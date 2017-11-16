import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { registerAccountService } from "./registerAccount.service";
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http'
import { connectionType, getConnectionType } from "connectivity";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { checkRegister } from "../model/checkRegister.model"

@Component({
    selector: "registerAccount",
    templateUrl: "registerAccount.component.html",
    styleUrls: ['registerAccount.component.css'],
    moduleId: module.id
})

export class registerAccountComponent implements OnInit {

    checkRegister: checkRegister;
    res
    idCard = "";
    hn;

    ngOnInit(): void {
        this.checkRegister = new checkRegister();
        this.checkRegister.hn = "" ;
        this.checkRegister.idCard = "" ;
        securityService.setCheckRegister = JSON.stringify(this.checkRegister);
        console.log(securityService.getCheckRegister);
        this.checkRegister = JSON.parse(securityService.getCheckRegister);
        console.log(this.checkRegister.idCard);
    }

    getDataPeople () {
        let nts = this ;
        this.registerAccountService.getDataPatient()
        .subscribe(
            (Response) => {
                if (Response.dataset.cid == nts.checkRegister.idCard) {
                
                    if (Response.dataset.hn == nts.checkRegister.hn) {
                      
                        this.router.navigate(["/security/registerPassword"]);
                    }
                    else{alert('ไม่พบหมายเลข HN นี้ในระบบ');}
                }
                else {alert('ไม่พบหมายเลขบัตรประชาชนนี้ในระบบ');}
            },
            (error) => {
                alert("Get Error");
            }
        )
        
    } 
 constructor(
    page: Page,
    private router: Router,
    private route: ActivatedRoute,
    private registerAccountService: registerAccountService
) {
    page.actionBarHidden = true;
    route.url.subscribe((s:UrlSegment[]) => {
        console.log("url", s);
    });
}
net () {
    this.router.navigate(["/security/registerPassword"]);
}
checkIdCardAndHn () {
        let test = this.checkRegister.idCard.length
        if (this.checkRegister.idCard != "" && this.checkRegister.hn != ""){
        if (test != 13) {
            alert("กรุณากรอกหมายเลขบัตรประชาชนให้ครบ 13 หลัก");
        }
        if (test == 13) {
        this.res = this.checkRegister.idCard.split("");
        console.log(this.res);
        let r = 13;
        let result=[];
        let total=0;
        let sum=0;
        let CheckDigit=0;
        let SumDigit=0;
        for(let i = 0;i<12;i++){
           result[i] = this.res[i] * r;
            r--;
            total = total + result[i];
            console.log(result[i] + "\n");
        }
        console.log(total);
        sum = sum + (total%11);
        console.log(sum);
        CheckDigit = 11-sum;
        console.log(CheckDigit);

        if(CheckDigit >= 10){
           SumDigit = CheckDigit%10;
           if(SumDigit == this.res[12]){
                console.log("หมายเลขบัตรประชาชนถูกต้อง");
                securityService.setCheckRegister = JSON.stringify(this.checkRegister);
                this.getDataPeople();
                
           }
           else{
                console.log("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                alert("หมายเลขบัตรประชาชนไม่ถูกต้อง")
           }
        }
        if(CheckDigit < 10){
            if(CheckDigit == this.res[12]){
                console.log("หมายเลขบัตรประชาชนถูกต้อง");
                securityService.setCheckRegister = JSON.stringify(this.checkRegister);
                this.getDataPeople();
           }
           else{
                console.log("หมายเลขบัตรประชาชนไม่ถูกต้อง");
                alert("หมายเลขบัตรประชาชนไม่ถูกต้อง");
           }
        }
    }
    }
    else {alert("กรุณาใส่หมายเลขบัตรประชาชนและหมายเลขHN")}
}
 }