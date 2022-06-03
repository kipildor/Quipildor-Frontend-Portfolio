import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../modelos/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  estadoURL = "http://localhost:8080/estado";

  constructor(private http:HttpClient) { }

  public listarEstados():Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estadoURL);
  }

  public buscarEst(id:number):Observable<Estado> {
    return this.http.get<Estado>(this.estadoURL+`/${id}`);
  }

}
