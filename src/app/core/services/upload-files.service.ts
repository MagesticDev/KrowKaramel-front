import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    constructor(private http: HttpClient) { }

    upload(file: File, baseUrl: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    getFiles(baseUrl: string): Observable<any> {
        return this.http.get(`${baseUrl}/files`);
    }
}