import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { user } from "../model/user.model"

let headers = new Headers({ "Content-Type": "application/json" });
let options = new RequestOptions({ headers: headers });

@Injectable()
export class formPicAndAcceptService {
    user = new user();
    
    postDataPatient () {
        console.log("connect");
        this.user = JSON.parse(securityService.getUserData);
        console.log(this.user.idCard);
        let url = "http://192.168.1.11:7777/newUser";
        return this.http.post(url, JSON.stringify(this.user), options)
        .subscribe(result => 
            {
               console.log("response : "+result);
            }, error => 
            {
            console.dir(error);
            });
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