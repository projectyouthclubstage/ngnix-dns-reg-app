import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry,map, catchError, tap } from 'rxjs/operators';
import { NginxReg } from './shared/nginx-reg';

@Injectable({
  providedIn: 'root'
})
export class RouteServiceService {

  apiUrl = "";
  constructor(private http: HttpClient) { }

  getData(): Observable<NginxReg> {
    return this.http.get<NginxReg>('http://192.168.233.1:9099/v1/dns')
    }

    handleError(error: any,data: Observable<NginxReg>): Observable<NginxReg> {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return data;  
    }
      
}
