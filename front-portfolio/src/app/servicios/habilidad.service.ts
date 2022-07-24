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

  public traerHabilidad(idSkill:number):Observable<Habilidad> {
    return this.http.get<Habilidad>(this.habilidadURL+`/${idSkill}`);
  }

  public crearHabilidad(skill:Habilidad):Observable<any> {
    return this.http.post<any>(this.habilidadURL+`/crear`, skill);
  }

  public actualizarHabilidad(idSkill:number, skill:Habilidad):Observable<any> {
    return this.http.put<any>(this.habilidadURL+`/editar/${idSkill}`, skill);
  }

  public borrarHabilidad(idSkill:number):Observable<any> {
    return this.http.delete<any>(this.habilidadURL+`/borrar/${idSkill}`);
  }

}
