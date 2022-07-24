import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';

@Component({
  selector: 'app-exp-lab',
  templateUrl: './exp-lab.component.html',
  styleUrls: ['./exp-lab.component.css']
})
export class ExpLabComponent implements OnInit {

  closeResult: string = '';
  public listaExp : ExpLab[]=[];
  public isLogged = false;
  //public expActual =0;
  public idExpBorrar =0;
  //public expBorrar:ExpLab;
  public idExpEditar =0;
  public imgVacia = "./assets/img/sin_imagen_V1.png";
  public logoVacio:boolean;

  constructor(private router:Router, private serviExp:ExpLabService, private tokenService:TokenService,
            private modalServ:NgbModal) { }

  ngOnInit(): void {
    this.serviExp.listarExperiencias().subscribe(data=>{this.listaExp=data});

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado exp Laboral:"+this.isLogged);
  }

  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBorrar(idExp, contentB) {
    //console.log("Se clickeó el botón de borrar.");
    this.idExpBorrar = idExp;

    this.modalServ.open(contentB, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditar(idExp, contentE) {
    //console.log("Se clickeó el botón de editar.");
    this.idExpEditar = idExp;

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
      //console.log("2_ "+this.expLab.urlLogo);
      this.logoVacio =true;
      return true;
    } else {
        //console.log("2_ "+this.expLab.urlLogo);
        this.logoVacio = false;
        return false;
      }
  }

}
