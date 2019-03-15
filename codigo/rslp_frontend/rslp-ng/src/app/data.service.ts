import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs/index";
import { Usuario } from "./modelos/usuario";
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class DataService {
    private actionUrl;
    private httpOptions;

    constructor(private http: HttpClient) {
        this.actionUrl = 'http://localhost:3000';
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            
          })
        }  
    }

    public getUsuarios(): Observable<Usuario> {
      return this.http.get<Usuario>("http://localhost:3000/usuario")
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}