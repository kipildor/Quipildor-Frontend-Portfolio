import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  closeResult: string = '';
  public listaProyectos:Proyecto[]=[];
  public isLogged = false;
  public idProyectoBorrar =0;
  public idProyectoEditar =0;

  constructor(private router:Router, private serviProy:ProyectoService, private tokenService: TokenService,
              private modalServ:NgbModal) { }

  ngOnInit(): void {
    this.serviProy.listarProyectos().subscribe(response=>this.listaProyectos=response);

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado proyectos:"+this.isLogged);
  }

  urlVacia(urlBDD:string):boolean {
    //urlBDD=urlBDD.trim();
    if( urlBDD == null || urlBDD == undefined || urlBDD == "null" || urlBDD == "undefined" || urlBDD == "") {
      return true;
    } else {
        return false;
      }
  }


  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBorrar(idProyecto, contentB) {
    //console.log("Se clickeó el botón de borrar.");
    this.idProyectoBorrar = idProyecto;

    this.modalServ.open(contentB, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditar(idProyecto, contentE) {
    //console.log("Se clickeó el botón de editar.");
    this.idProyectoEditar = idProyecto;

    this.modalServ.open(contentE, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /************  IMAGENES - INICIO  ******************************** */
  openAgregarImagen(idProyecto:number, contentImgAlta) {
    this.modalServ.open(contentImgAlta, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /************  IMAGENES - FIN  ******************************** */

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /* public goToUrl(url):void {
    //let cadena:string = "'"
    document.location.href = url;
  } */




}
