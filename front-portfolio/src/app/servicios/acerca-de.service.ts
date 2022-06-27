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
}
