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
  public expActual =0;
  public idExpBorrar =0;
  public expBorrar:ExpLab;

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
