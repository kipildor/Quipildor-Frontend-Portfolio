import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
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

  closeResult: string = '';
  public listaEducacion : Educacion[] = [];
  public estadoDeEduc : Estado;
  //public prueba007 : number = null;
  public isLogged = false;
  public idEducBorrar =0;
  public idEducEditar =0;
  public imgVacia = "./assets/img/sin_imagen_V1.png";
  public logoVacio:boolean;

  constructor(private router:Router, private serviEduc:EducacionService, private tokenService:TokenService,
              private modalServ:NgbModal) { }

  ngOnInit(): void {
    //this.serviEduc.listarEduc().subscribe({next:data=>{this.listaEducacion=data;}});
    this.serviEduc.listarEduc().subscribe(response=>this.listaEducacion=response);

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado educacion:"+this.isLogged);
  }

  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBorrar(idEduc, contentB) {
    this.idEducBorrar = idEduc;

    this.modalServ.open(contentB, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditar(idEduc, contentE) {
    this.idEducEditar = idEduc;

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

  fechaNula(variable):boolean {
    //const variable = this.exp.fechaSalida;
    if( variable === null || variable == undefined) {
      return true;
    } else {
        return false;
      }
  }

  imgNula(urlLogo:string):boolean {
    const variable:string = urlLogo;
    if( variable == null || variable == undefined || variable == "null" || variable == "undefined" || variable == "") {
      this.logoVacio =true;
      return true;
    } else {
        this.logoVacio = false;
        return false;
      }
  }

  /* variableNula(variable):boolean {
    if( variable == null || variable == undefined || variable == "null" || variable == "undefined" || variable == "") {
      return true;
    } else {
        return false;
      }
  } */

}
