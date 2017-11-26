import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { connectionType, getConnectionType } from "connectivity";
import { securityService } from "../security.service";
import { user } from "../model/user.model"

@Injectable()
export class formPicAndAcceptService {
    
    user = new user();
    token = "a27cf250553d383da99d35260807f4bd2";
    request = "preregister";
    
    postDataPatient () {
        var formData = new FormData();
        var headers = new Headers(); 
        headers.append("Content-Type", "multipart/octet-stream")
        console.log("connect");
        this.user = JSON.parse(securityService.getUserData);
        const body = {
            token: "a27cf250553d383da99d35260807f4bd2",
            request: "preregister",
            cid: "1600100651022",
            prename: "นาย",
            fname: "ทองคำ",
            lname: "เงินแท้",
            gender: "ชาย",
            birthday: "1995-12-14",
            nation: "ไทย",
            religion: "ไทย",
            address: "120/9 ม.10 โนนห้อม อ.เมือง จ.ปราจีนบุรี",
            phone: "0888885989",
            rightname: "บัตรทองในเขต",
            parent_type: "พ่อ",
            parent_fname: "สตีฟ",
            parent_lname: "โรเจอร์",
            parent_phone: "0896658975",
            avatar: "http://i.annihil.us/u/prod/marvel/movies/civilwar/images/captainamerica_hero.png",
            symptom: "ปวดหัวตัวร้อน"
        }
        console.log(this.user.idCard);
        formData.append('token', this.token);
        formData.append('request', this.request);
        formData.append('cid', this.user.idCard);
        formData.append('prename', this.user.nameTitle);
        formData.append('fname', this.user.name);
        formData.append('lname', this.user.surname);
        formData.append('gender', this.user.gender);
        formData.append('birthday', this.user.birthDay);
        formData.append('nation', this.user.nation);
        formData.append('religion', this.user.religion);
        formData.append('address', this.user.address);
        formData.append('phone', this.user.telephone);
        formData.append('rightname', this.user.medicalEligibilityVerification);
        formData.append('parent_type', this.user.contact);
        formData.append('parent_fname', this.user.nameRelative);
        formData.append('parent_lname', this.user.surnameRelative);
        formData.append('parent_phone', this.user.telephoneRelative);
        formData.append('avatar', this.user.pic);
        formData.append('symptom', this.user.symptom);
        let url = "http://api.cpa.go.th/patient.php"
        // var request = {
        //     url: url,
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/multipart",
        //         "File-Name": name
        //     },
        // };
        return this.http.post(url, formData, {headers: headers})
        //return this.http.post(url, body, {headers: headers})
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