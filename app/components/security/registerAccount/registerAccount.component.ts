import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { registerAccountService } from "./registerAccount.service";
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http'
import { connectionType, getConnectionType } from "connectivity";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { checkRegister } from "../model/checkRegister.model"
import { ActivityIndicator } from "ui/activity-indicator";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";

@Component({
    selector: "registerAccount",
    templateUrl: "registerAccount.component.html",
    styleUrls: ['registerAccount.component.css'],
    moduleId: module.id
})

export class registerAccountComponent implements OnInit {

    public firebase = require("nativescript-plugin-firebase");

    checkRegister: checkRegister;
    res
    idCard = "";
    hn;
    dataUser ;
    isLoading = true ;

    ngOnInit(): void {
        this.checkRegister = new checkRegister();
        this.checkRegister.hn = "" ;
        this.checkRegister.idCard = "" ;
        securityService.setCheckRegister = JSON.stringify(this.checkRegister);
        console.log(securityService.getCheckRegister);
        this.checkRegister = JSON.parse(securityService.getCheckRegister);
        console.log(this.checkRegister.idCard);

        this.firebase.init({
            storageBucket: "gs://fir-appproject14.appspot.com"
              // Optionally pass in properties for database, authentication and cloud messaging,
              // see their respective docs.
            }).then(
              instance => {
                console.log("firebase.init done")
              },
              error => {
                console.log(`firebase.init error: ${error}`);
              }
            )
  
            var tns = this;
            
                  var onQueryEvent = function(result) {
                    // note that the query returns 1 match at a time
                    // in the order specified in the query
                    if (!result.error) {
                        console.log("Event type: " + result.type);
                        console.log("Key: " + result.key);
                        console.log("Value: " + JSON.stringify(result.value));
                        tns.dataUser = result.value;
                    }
                };
            
                this.firebase.query(
                    onQueryEvent,
                    "/registerUsers",
                    {
                        // set this to true if you want to check if the value exists or just want the event to fire once
                        // default false, so it listens continuously.
                        // Only when true, this function will return the data in the promise as well!
                        singleEvent: true,
                        // order by company.country
                        orderBy: {
                            type: this.firebase.QueryOrderByType.CHILD,
                            value: 'since' // mandatory when type is 'child'
                        }
                    }
                );
  
    }

    getDataPeople () {
        let tns = this ;
        this.isLoading = false ;
        this.registerAccountService.getDataPatient()
        .subscribe(
            (Response) => {
                if (Response.dataset.cid == tns.checkRegister.idCard && Response.dataset.hn == tns.checkRegister.hn) {
                
                        var results = Object.keys(this.dataUser).map(function(key) {
                            return tns.dataUser[key];
                          });
                          
                             console.log(JSON.stringify(results)); 
                             console.log(JSON.stringify(Response.dataset.hn.toString()));          
                          let resultUserUsername = results.find(item => item.hn === Response.dataset.hn.toString());

                          if(resultUserUsername){
                            this.isLoading = true ;
                            alert("ไม่สามารถทำการลงทะเบียนได้\nหมายเลขประจำตัวผู้ป่วยนี้มีอยู่ในระบบแล้ว");
                          }
                          else {
                                this.router.navigate(["/security/registerPassword"]);
                                this.isLoading = true ;
                            }
                }
                else {
                    this.isLoading = true ;
                    alert('กรุณาใส่หมายเลขบัตรประชาชนและหมายเลข HN ให้ถูกต้อง');
                }
            },
            (error) => {
                this.isLoading = true ;
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