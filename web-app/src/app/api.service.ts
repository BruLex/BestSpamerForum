import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    static SID = '';
    apiUrl = 'http://127.0.0.1:8080/';

    constructor(private http: HttpClient, private evnSrv: EnvService) {}

    get(url: string): Observable<any> {
        return this.http.get(this.apiUrl + url, { headers: new HttpHeaders({ SID: this.evnSrv.getSID() }) });
    }

    post(url: string, body: object): Observable<any> {
        return this.http.post(this.apiUrl + url, body, { headers: new HttpHeaders({ SID: this.evnSrv.getSID() }) });
    }
}
