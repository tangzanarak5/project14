import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { checkHn } from "../model/checkHn.model"

@Injectable()
export class verifyHnService {

    checkHn: checkHn;
    token = "a27cf250553d383da99d35260807f4bd2";

    getDataPatient (): Observable<any> {
        this.checkHn = new checkHn();
        console.log(securityService.getCheckHn);
        this.checkHn = JSON.parse(securityService.getCheckHn);
        console.log(this.checkHn.idCard);
        let url = "http://api.cpa.go.th/patient.php?token=" + this.token + "&request=get_preregister&cid=" + this.checkHn.idCard;
        return this.http.get(url).map(response => response.json())
        .catch(this.handleErrors);
    }

    getDataPatientReal (): Observable<any> {
        this.checkHn = new checkHn();
        console.log(securityService.getCheckHn);
        this.checkHn = JSON.parse(securityService.getCheckHn);
        console.log(this.checkHn.idCard);
        let url = "http://api.cpa.go.th/patient.php?request=get&cid=" + this.checkHn.idCard + "&token=" + this.token;
        return this.http.get(url).map(response => response.json())
        .catch(this.handleErrors);
    }

    constructor(
        private router: Router,
        private http: Http
    ) { }
handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
}
}