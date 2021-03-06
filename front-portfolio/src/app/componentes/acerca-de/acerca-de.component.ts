import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { AcercaDe } from 'src/app/modelos/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  closeResult: string = '';
  public acerca:AcercaDe[]=[];
  public isLogged = false;
  public parrActual =0;
  public idParrBorrar =0;
  public acercaBorrar:AcercaDe;
  //public cant_parrafos:number=this.acerca.length;
  //public primer_parrafo:String;

  constructor(private router:Router, private serviAcerca:AcercaDeService, public modalServ:NgbModal,
              private tokenService:TokenService) { }

  ngOnInit(): void {
    this.serviAcerca.listarParrafos().subscribe(data=>{this.acerca=data});

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado acerca de mi...:"+this.isLogged);

  }

  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Abre el formulario para modificar el párrafo
  formulario_parrafo(idParrafo:number, contentAcerca) {
    this.parrActual = idParrafo;
    this.modalServ.open(contentAcerca, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  cargar_borrar_parrafo(idParrafo:number, contentBorrarParrafo) {
    this.idParrBorrar = idParrafo;

    this.modalServ.open(contentBorrarParrafo, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
/*
  public borrar_parrafo(idBorrar):void {
    this.serviAcerca.borrarParrafo(idBorrar).subscribe(
      data=>{
        this.ngOnInit();
      },
      err=>console.log(err)
    );
    //console.log(this.acerca.idParrafo +"-"+this.acerca.parrafo+"-"+this.acerca.posicion+"-"+this.acerca.persona_id);
    this.getDismissReason(`Completado`);
  }
 */
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
