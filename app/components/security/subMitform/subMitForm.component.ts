import { Component } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { action } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { securityService } from "../security.service";
import { user } from "../model/user.model"

@Component({
    selector: "subMitForm",
    templateUrl: "subMitForm.component.html",
    styleUrls: ['subMitForm.component.css'],
    moduleId: module.id
})

export class subMitFormComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        page: Page
    ) { page.actionBarHidden = true;}

    nextTo () {
            this.router.navigate(["/security/standbytologin"]);
    }
    
}