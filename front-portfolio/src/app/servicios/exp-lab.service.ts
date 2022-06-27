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
}
