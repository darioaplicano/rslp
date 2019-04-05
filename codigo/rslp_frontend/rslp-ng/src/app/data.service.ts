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
      return this.http.get<Usuario>(this.actionUrl+"/usuario")
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public getUsuario(nickname:string): Observable<Usuario> {
      return this.http.get<Usuario>(this.actionUrl+"/usuario/"+nickname)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public createUsuario(nuevo: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.actionUrl+"/usuario", nuevo)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public updateUsuario(updated: Usuario): Observable<Usuario> {
      return this.http.put<Usuario>(this.actionUrl+"/usuario/"+updated._id, updated)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public deleteUsuario(deleted: Usuario) {
      return this.http.delete<Usuario>(this.actionUrl+"/usuario/"+deleted._id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public getSeguidores(usuario: Usuario) {
      return this.http.get<Array<Usuario>>(this.actionUrl+"/sigue/"+usuario._id+"/seguidores")
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    public getSeguidos(usuario: Usuario) {
      return this.http.get<Array<Usuario>>(this.actionUrl+"/sigue/"+usuario._id+"/seguidos")
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