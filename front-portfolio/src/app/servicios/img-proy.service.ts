import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImgProy } from '../modelos/img-proy';

@Injectable({
  providedIn: 'root'
})
export class ImgProyService {

  imagenProyURL = 'http://localhost:8080/imagen';

  constructor(private http:HttpClient) { }

  public listarImagenes():Observable<ImgProy[]> {//TODAS
    return this.http.get<ImgProy[]>(this.imagenProyURL+`/invitado`);
  }

  public listarImagenesDeUnProyecto(idProyecto:number):Observable<ImgProy[]> {//TODAS LAS DE UN PROYECTO
    return this.http.get<ImgProy[]>(this.imagenProyURL+`/invitado/${idProyecto}`);
  }

  public traerImagen(idImgProy:number):Observable<ImgProy> {//SOLO UNA
    return this.http.get<ImgProy>(this.imagenProyURL+`/${idImgProy}`);
  }

  public crearImagenProyecto(imgProy:ImgProy):Observable<any> {
    return this.http.post<any>(this.imagenProyURL+`/crear`, imgProy);
  }

  public actualizarImagenProyecto(idImgProy:number, imgProy:ImgProy):Observable<any> {
    return this.http.put<any>(this.imagenProyURL+`/editar/${idImgProy}`, imgProy);
  }

  public borrarImagenProyecto(idImgProy:number):Observable<any> {
    return this.http.delete<any>(this.imagenProyURL+`/borrar/${idImgProy}`);
  }
/*
  public crearExperienciaConlogo(expLab:ImgProy, img:File):Observable<any> {
    return this.http.post<any>(this.imgProyURL+`/crear_con_logo`, expLab);
  } */

}
