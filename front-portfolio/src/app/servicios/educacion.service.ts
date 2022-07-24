import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../modelos/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = "http://localhost:8080/educ";

  constructor(private http:HttpClient) { }

  public listarEduc():Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.educacionURL+`/invitado`);
  }

  public buscarEducacion(idEduc:number):Observable<Educacion> {
    return this.http.get<Educacion>(this.educacionURL+`/${idEduc}`);
  }

  public crearEducacion(educ:Educacion):Observable<any> {
    return this.http.post<any>(this.educacionURL+`/crear`, educ);
  }

  public modificarEducacion(idEduc:number, educ:Educacion):Observable<any> {
    return this.http.put<any>(this.educacionURL+`/editar/${idEduc}`, educ);
  }

  public borrarEducacion(idEduc:number):Observable<any> {
    return this.http.delete<any>(this.educacionURL+`/borrar/${idEduc}`);
  }


}
