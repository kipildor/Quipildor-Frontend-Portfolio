import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../modelos/acerca-de';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {

  acercaDeURL = 'http://localhost:8080/acerca';

  constructor(private http:HttpClient) { }

  public listarParrafos():Observable<AcercaDe[]> {
    return this.http.get<AcercaDe[]>(this.acercaDeURL+`/invitado`);
  }

  public traerParrafo(idParrafo:number):Observable<AcercaDe> {
    return this.http.get<AcercaDe>(this.acercaDeURL+`/${idParrafo}`);
  }

  public crearParrafo(parrafo:AcercaDe):Observable<any> {
    return this.http.post<any>(this.acercaDeURL+`/crear`, parrafo);
  }

  public actualizarParrafo(id:number, parrafo:AcercaDe):Observable<any> {
    return this.http.put<any>(this.acercaDeURL+`/editar/${id}`, parrafo);
  }

  public borrarParrafo(id:number):Observable<any> {
    return this.http.delete<any>(this.acercaDeURL+`/borrar/${id}`);
  }



}
