import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos:Proyecto[]=[];

  constructor(private router:Router, private serviProy:ProyectoService) { }

  ngOnInit(): void {
    this.serviProy.listarProyectos().subscribe(response=>this.listaProyectos=response);
  }

  urlVacia(urlBDD):boolean {
    if( urlBDD == null || urlBDD == undefined || urlBDD == "null" || urlBDD == "undefined" || urlBDD == "") {
      return true;
    } else {
        return false;
      }
  }

}
