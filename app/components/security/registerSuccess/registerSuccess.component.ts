import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"
import { ActivityIndicator } from "ui/activity-indicator";

@Component({
    selector: "registerSuccess",
    templateUrl: "registerSuccess.component.html",
    styleUrls: ['registerSuccess.component.css'],
    moduleId: module.id
})

export class registerSuccessComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        page: Page
    ) { page.actionBarHidden = true;}

    ngOnInit(): void {
        
    }
    back () {
        this.router.navigate(["/security/standbytologin"]);
    }
}