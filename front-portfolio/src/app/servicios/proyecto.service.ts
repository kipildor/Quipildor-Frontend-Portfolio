import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../modelos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  apiUrl:string = environment.apiBaseUrl;

  proyectoURL = this.apiUrl+"/proyecto";

  constructor(private http:HttpClient) { }

  public listarProyectos():Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.proyectoURL+`/invitado`);
  }


  public traerProyecto(idProyecto:number):Observable<Proyecto> {
    return this.http.get<Proyecto>(this.proyectoURL+`/${idProyecto}`);
  }

  public crearProyecto(proyecto:Proyecto):Observable<any> {
    return this.http.post<any>(this.proyectoURL+`/crear`, proyecto);
  }

  public borrarProyecto(idProyecto:number):Observable<any> {
    return this.http.delete<any>(this.proyectoURL+`/borrar/${idProyecto}`);
  }

  public actualizarProyecto(idProyecto:number, proyecto:Proyecto):Observable<any> {
    return this.http.put<any>(this.proyectoURL+`/editar/${idProyecto}`, proyecto);
  }


}
