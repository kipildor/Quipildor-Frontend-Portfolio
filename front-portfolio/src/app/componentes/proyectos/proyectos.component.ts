import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos:Proyecto[]=[];
  public isLogged = false;

  constructor(private router:Router, private serviProy:ProyectoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.serviProy.listarProyectos().subscribe(response=>this.listaProyectos=response);

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado mis datos:"+this.isLogged);
  }

  urlVacia(urlBDD):boolean {
    if( urlBDD == null || urlBDD == undefined || urlBDD == "null" || urlBDD == "undefined" || urlBDD == "") {
      return true;
    } else {
        return false;
      }
  }

}
