import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private _configData: any;
    private _promise: Promise<any>;
    private _promiseDone: boolean = false;
 
    constructor(private http: HttpClient) { }
 
    loadConfig(): Promise<any> {
        var url: string = "/api/config";
        this._configData = null;
 
        if (this._promiseDone) {
            // console.log(("In Config Service. Promise is already complete.");
            return Promise.resolve();
        }
 
        if (this._promise != null) {
            // console.log(("In Config Service. Promise exists.  Returning it.");
            return this._promise;
        }
 
        // console.log(("In Config Service. Loading config data.");
        this._promise = this.http
            .get(url, { headers: new HttpHeaders() })
            .map((res: Response) => { return res; })
            .toPromise()
            .then((data: any) => { this._configData = data; this._promiseDone = true; })
            .catch((err: any) => { this._promiseDone = true; return Promise.resolve(); });
        return this._promise;
    }
 
    get configData(): any {
        return this._configData;
    }
}