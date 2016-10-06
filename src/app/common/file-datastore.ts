import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class FileDatastore {

    constructor(
        private http: Http
    ){}

    public get(location) {

        return new Observable((observer) => {
            var req = new XMLHttpRequest();
            req.open('GET',location + '?host=' + window.location.host, true);
            req.responseType = 'arraybuffer';
            req.onload = function() {
                observer.next(req.response);
            };
            req.send();
        });


        //return this.http.get(location + '?host=' + window.location.host)
        //    .map(response => response.arrayBuffer());
    }

}