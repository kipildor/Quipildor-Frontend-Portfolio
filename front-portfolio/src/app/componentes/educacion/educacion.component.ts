import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/modelos/educacion';
import { Estado } from 'src/app/modelos/estado';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public listaEducacion : Educacion[] = [];
  public estadoDeEduc : Estado;
  public prueba007 : number = null;

  constructor(private router:Router, private serviEduc:EducacionService) { }

  ngOnInit(): void {
    //this.serviEduc.listarEduc().subscribe({next:data=>{this.listaEducacion=data;}});
    this.serviEduc.listarEduc().subscribe(response=>this.listaEducacion=response);
  }

  variableNula(variable):boolean {
    if( variable == null || variable == undefined || variable == "null" || variable == "undefined" || variable == "") {
      return true;
    } else {
        return false;
      }
  }

}
