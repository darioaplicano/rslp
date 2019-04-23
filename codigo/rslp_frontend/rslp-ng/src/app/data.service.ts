import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs/index";
import { Usuario } from "./modelos/usuario";
import { retry, catchError } from 'rxjs/operators';
import { VistoLeido } from './modelos/vistoLeido';
import { VerLeer } from './modelos/verLeer';
import { Contenido } from './modelos/contenido';
import { Resena } from './modelos/resena';
import { Seguir } from './modelos/seguir';


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

    public getUsuarios(){
      return this.http.get<Array<Usuario>>(this.actionUrl+"/usuario")
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

  // Visto leido
  public getListaVistosLeidos(usuario: Usuario) {
    return this.http.get<Array<VistoLeido>>(this.actionUrl+"/vistoLeido/"+usuario._id+"/contenidos")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Ver leer
  public getListaVerLeer(usuario: Usuario) {
    return this.http.get<Array<VerLeer>>(this.actionUrl+"/verLeer/"+usuario._id+"/contenidos")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getContenido(){
    return this.http.get<Array<Contenido>>(this.actionUrl+"/contenido")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Data Services Alex
  public getContenidoPorId(id: string){
    return this.http.get<Contenido>(this.actionUrl+"/contenido/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getResena(contenido: string) {
    return this.http.get<Array<Resena>>(this.actionUrl+"/comentar/"+contenido+"/tcomentarios")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public createResena(nuevo: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.actionUrl+"/comentar/", nuevo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public updateRecomendacion(updated: VistoLeido): Observable<VistoLeido> {
    return this.http.put<VistoLeido>(this.actionUrl+"/vistoLeido/"+updated.usuario._id+"/"+updated.contenido._id+"/actualizar", updated)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deletevistoLeido(deleted: VistoLeido) {
    return this.http.delete<VistoLeido>(this.actionUrl+"/vistoLeido/"+deleted.usuario._id+"/"+deleted.contenido._id+"/eliminar")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deleteverLeer(deleted: VerLeer) {
    return this.http.delete<VerLeer>(this.actionUrl+"/verLeer/"+deleted.usuario._id+"/"+deleted.contenido._id+"/eliminar")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public createverLeer(nuevo: VerLeer): Observable<VerLeer> {
    return this.http.post<VerLeer>(this.actionUrl+"/verLeer/", nuevo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public createvistoLeido(nuevo: VistoLeido): Observable<VistoLeido> {
    return this.http.post<VistoLeido>(this.actionUrl+"/vistoLeido/", nuevo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deleteSeguidor(seguidor: string, seguido: string) {
    return this.http.delete<Seguir>(this.actionUrl+"/sigue/"+seguidor+"/"+seguido)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public createSeguidor(nuevo: Seguir): Observable<Seguir> {
    return this.http.post<Seguir>(this.actionUrl+"/sigue/", nuevo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public updateContenido(updated: Contenido): Observable<Contenido> {
    return this.http.put<Contenido>(this.actionUrl+"/contenido/"+updated._id, updated)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deleteContenido(eliminar: string) {
    return this.http.delete<Contenido>(this.actionUrl+"/contenido/"+eliminar)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  //Termina los dataServices Alex


  public createContenido(nuevo: Contenido): Observable<Contenido> {
    return this.http.post<Contenido>(this.actionUrl+"/contenido/", nuevo)
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