import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { securityService } from "../security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { idp } from "../model/idp.model"
import { standbytologinService } from "./standbytologin.service";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";


@Component({
    selector: "standbytologin",
    templateUrl: "standbytologin.component.html",
    styleUrls: ['standbytologin.component.css'],
    moduleId: module.id
})

export class StandByToLoginComponent implements OnInit {

    public firebase = require("nativescript-plugin-firebase");

    idp: idp ;
    connect = false ;
    dataUser ;
    datasUser ;

    constructor(
        private modal: ModalDialogService,
        private route: ActivatedRoute,
        private router: Router,
        private standbytologinService: standbytologinService,
        page: Page) {
        page.actionBarHidden = true;
    }
    ngOnInit(): void {
        
        this.firebase.init({
          storageBucket: "gs://fir-appproject14.appspot.com"
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
          }).then(
            instance => {
              console.log("firebase.init done");
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

          this.idp = new idp() ;
          this.idp.username = "" ;
          this.idp.password = "" ;
          securityService.setIdp = JSON.stringify(this.idp);
          console.log(securityService.getIdp);
          this.idp = JSON.parse(securityService.getIdp);
          console.log(JSON.stringify(this.idp) + "dsfsdf");
        //   console.log(securityService.isLoggedIn());
        //   console.log(securityService.getIsLogin);

    }

    checkLogin () { 
            var tns = this;
             var results = Object.keys(this.dataUser).map(function(key) {
               return tns.dataUser[key];
             });
             
                console.log(JSON.stringify(results)); 
                console.log(JSON.stringify(tns.idp));            
             let resultUserUsername = results.find(item => item.hn === tns.idp.username);
             console.log(resultUserUsername);
                if (resultUserUsername) {
                    console.log("username connect");
                    let resultUserPassword = results.find(item => item.pass === tns.idp.password);
               if (resultUserPassword) {
                    this.idp.isLogin = true ;
                    securityService.setIsLogin = "true";
                    console.log("password connect");
                    securityService.setIdp = JSON.stringify(tns.idp);

                    tns.standbytologinService.getDataPatient()
                    .subscribe(
                        (Response) => {
                            console.log(JSON.stringify(Response) + "user login");
                          securityService.setDataUser = JSON.stringify(Response);
                          tns.datasUser = JSON.parse(securityService.getDataUser);
                          console.log(JSON.stringify(tns.dataUser));
                          tns.router.navigate(["/loginAccept"]);
                        },
                        (error) => {
                            alert("Get Error");
                        }
                    )

                   
                    
               }
               else {
                   console.log("password fail");
                    alert("กรุณาใส่หมายเลข HN และ รหัสผ่าน ให้ถูกต้อง");
            }
             }
             else {
                 console.log("username fail");
                 alert("กรุณาใส่หมายเลข HN และ รหัสผ่าน ให้ถูกต้อง");
                }
             //console.log(JSON.stringify(resultUserData.password))
        
        }
        // check () {
        //     this.router.navigate(["/security/loginProfile"]);
        // }
 }