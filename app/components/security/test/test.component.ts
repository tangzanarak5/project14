import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "test",
    templateUrl: "test.component.html",
    moduleId: module.id
})

export class testComponent implements OnInit {
    name = "tang" ;
    ngOnInit(): void {
        
    }
    test () {
        this.router.navigate(["/security/loginProfile"]);
    }

 constructor(
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    page: Page
) {
    page.actionBarHidden = true;
    route.url.subscribe((s:UrlSegment[]) => {
        console.log("url", s);
    });
}

 }