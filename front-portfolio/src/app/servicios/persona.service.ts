import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  apiUrl:string = environment.apiBaseUrl;

  personaURL = this.apiUrl+'/persona';

  constructor(private http:HttpClient) { }

  //public mostrarPersona(id:number):Observable<Persona> {
  public mostrarPersona(id:number):Observable<Persona> {
    //console.log("Holaaaa");
    //return this.http.get<Persona>(this.personaURL+`traer/persona/${id}`);
    return this.http.get<Persona>(this.personaURL+`/invitado/traer-persona/${id}`);
  }

  public modificarPersona(id:number, per:Persona):Observable<any> {
    console.log("persona.service.ts --> "+per.email);
    return this.http.put<any>(this.personaURL+`/editar/1`, per);
  }

  public modificarPersonaDirecto(id:number, per:Persona):Observable<any> {
    console.log("persona.service.ts --> "+per.email);
    return this.http.put<any>(this.personaURL+`/editardirecto/1`, per);
  }

}
