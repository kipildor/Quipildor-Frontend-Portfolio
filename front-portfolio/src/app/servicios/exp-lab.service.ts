import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpLab } from '../modelos/exp-lab';

@Injectable({
  providedIn: 'root'
})
export class ExpLabService {

  expLabURL = 'http://localhost:8080/exp';

  constructor(private http:HttpClient) { }

  public listarExperiencias():Observable<ExpLab[]> {
    return this.http.get<ExpLab[]>(this.expLabURL+`/invitado`);
  }

  public traerExperiencia(idExpLab:number):Observable<ExpLab> {
    return this.http.get<ExpLab>(this.expLabURL+`/${idExpLab}`);
  }

  public crearExperiencia(expLab:ExpLab):Observable<any> {
    return this.http.post<any>(this.expLabURL+`/crear`, expLab);
  }

  public actualizarExperiencia(idExpLab:number, expLab:ExpLab):Observable<any> {
    return this.http.put<any>(this.expLabURL+`/editar/${idExpLab}`, expLab);
  }

  public borrarExperiencia(idExpLab:number):Observable<any> {
    return this.http.delete<any>(this.expLabURL+`/borrar/${idExpLab}`);
  }

  public crearExperienciaConlogo(expLab:ExpLab, img:File):Observable<any> {
    return this.http.post<any>(this.expLabURL+`/crear_con_logo`, expLab);
  }

}
