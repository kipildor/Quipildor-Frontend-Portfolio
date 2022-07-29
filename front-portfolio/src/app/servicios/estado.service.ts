import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../modelos/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  apiUrl:string = environment.apiBaseUrl;

  estadoURL = this.apiUrl+"/estado";

  constructor(private http:HttpClient) { }

  public listarEstados():Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estadoURL);
  }

  public buscarEst(id:number):Observable<Estado> {
    return this.http.get<Estado>(this.estadoURL+`/${id}`);
  }

}
