import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../modelos/acerca-de';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {
  apiUrl:string = environment.apiBaseUrl;

  acercaDeURL = this.apiUrl+'/acerca';

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
