import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  closeResult: string = '';
  public listaHabilid : Habilidad[] = [];
  public isLogged = false;
  public idSkillBorrar =0;
  public skillBorrar:Habilidad;
  public idSkillEditar =0;

  constructor(private router:Router, private serviHabilid:HabilidadService, private tokenService:TokenService,
              private modalServ:NgbModal ) { }

  ngOnInit(): void {
    this.serviHabilid.listarHabilidades().subscribe(data=>{this.listaHabilid=data});

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado mis datos:"+this.isLogged);
  }




  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBorrar(idSkill, contentB) {
    //console.log("Se clickeó el botón de borrar.");
    this.idSkillBorrar = idSkill;

    this.modalServ.open(contentB, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditar(idSkill, contentE) {
    //console.log("Se clickeó el botón de editar.");
    this.idSkillEditar = idSkill;

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
