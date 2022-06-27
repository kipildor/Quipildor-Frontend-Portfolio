import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../modelos/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habilidadURL = "http://localhost:8080/habilidad"

  constructor(private http:HttpClient) { }

  public listarHabilidades():Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(this.habilidadURL+`/invitado`);
  }

}
