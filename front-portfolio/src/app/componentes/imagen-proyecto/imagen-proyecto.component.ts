import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { ImgProy } from 'src/app/modelos/img-proy';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ImgProyService } from 'src/app/servicios/img-proy.service';

@Component({
  selector: 'app-imagen-proyecto',
  templateUrl: './imagen-proyecto.component.html',
  styleUrls: ['./imagen-proyecto.component.css']
})
export class ImagenProyectoComponent implements OnInit {
  closeResult: string = '';
  public listaDeImagenes:ImgProy[]=[];
  public isLogged = false;
  public idImagenABorrar =0;
  public idImagenAEditar =0;
  public idProyectoActual:number=0;
  @Input() proyectoActual:Proyecto;
  @Input() indice:number;

  constructor(private router:Router, private serviImgProy:ImgProyService, private tokenService: TokenService,
    private modalServ:NgbModal) { }

  ngOnInit(): void {
    //console.log("Hola descripcion: "+this.proyectoActual.descripcion);
    //console.log("Hola idProyecto: "+this.proyectoActual.idProyecto);
    this.serviImgProy.listarImagenesDeUnProyecto(this.proyectoActual.idProyecto).subscribe(response=>this.listaDeImagenes=response);

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado Imagenes del proyecto:"+this.isLogged);
  }

  openAgregarImagen(idProyecto:number, content) {
    this.idProyectoActual=idProyecto;
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditarImagen(idImagen, contentB) {
    //console.log("Se clickeó el botón de borrar.");
    this.idImagenAEditar = idImagen;

    this.modalServ.open(contentB, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBorrarImagen(idImagen, contentE) {
    //console.log("Se clickeó el botón de editar.");
    this.idImagenABorrar = idImagen;

    this.modalServ.open(contentE, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
