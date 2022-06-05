import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from '../modelos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectoURL = "http://localhost:8080/proyecto";

  constructor(private http:HttpClient) { }

  public listarProyectos():Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.proyectoURL);

  }

}
