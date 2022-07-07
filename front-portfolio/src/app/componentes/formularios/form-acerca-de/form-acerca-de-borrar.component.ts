import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { AcercaDe } from 'src/app/modelos/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component';

@Component({
  selector: 'app-form-acerca-de-borrar',
  templateUrl: './form-acerca-de-borrar.component.html',
  styleUrls: ['./form-acerca-de-borrar.component.css']
})
export class FormAcercaDeBorrarComponent implements OnInit {

  //closeResult: string = '';
  public idParrBorrar =0;
  public acercaBorrar:AcercaDe;

  constructor(private router:Router, private serviAcerca:AcercaDeService, public modalServ:NgbModal,
              private tokenService:TokenService, public acercaDeComp:AcercaDeComponent) { }

  ngOnInit(): void {
    this.idParrBorrar = this.acercaDeComp.idParrBorrar;

    this.serviAcerca.traerParrafo(this.idParrBorrar).subscribe(data=>{this.acercaBorrar=data;},
      err=>console.log(err)
    );
  }
/*
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

    this.serviAcerca.traerParrafo(this.idParrBorrar).subscribe(data=>{this.acercaBorrar=data;},
      err=>console.log(err)
    );

    this.modalServ.open(contentBorrarParrafo, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 */
  public borrar_parrafo():void {
    this.serviAcerca.borrarParrafo(this.idParrBorrar).subscribe(
      data=>{
        this.acercaDeComp.ngOnInit();
      },
      err=>console.log(err)
    );
    this.modalServ.dismissAll();
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.modalServ.dismissAll();
      return `with: ${reason}`;
    }
  }

}
