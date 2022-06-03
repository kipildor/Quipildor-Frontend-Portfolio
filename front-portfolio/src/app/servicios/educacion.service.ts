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
    return this.http.get<Educacion[]>(this.educacionURL);

  }

}
