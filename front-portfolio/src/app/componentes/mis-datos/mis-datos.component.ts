import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PersonaByIdComponent } from './persona-by-id/persona-by-id.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from 'src/app/jwt/service/token.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  closeResult: string = '';
  public perso:Persona;
  isLogged = false;
  //public persoById:PersonaByIdComponent;

  constructor(private servi:PersonaService, private router:Router, public modalServ:NgbModal, private tokenService:TokenService) { }


  ngOnInit(): void {
    this.servi.mostrarPersona(1).subscribe(data=>{this.perso=data;})

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log(this.isLogged);
  }

  open(content) {
    this.modalServ.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
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

  public recargarComponente():void {
    this.ngOnInit();
  }

}
