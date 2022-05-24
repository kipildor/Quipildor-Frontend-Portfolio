import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaURL = 'http://localhost:8080/persona/traer/persona/1';

  constructor(private http:HttpClient) { }

  //public mostrarPersona(id:number):Observable<Persona> {
  public mostrarPersona():Observable<Persona> {
    console.log("Holaaaa");
    
    //return this.http.get<Persona>(this.personaURL+`traer/persona/${id}`);
    return this.http.get<Persona>(this.personaURL);

  }
  
}
