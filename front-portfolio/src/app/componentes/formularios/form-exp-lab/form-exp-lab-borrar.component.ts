import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { TokenService } from 'src/app/jwt/service/token.service';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';
import { ExpLabComponent } from '../../exp-lab/exp-lab.component';

@Component({
  selector: 'app-form-exp-lab-borrar',
  templateUrl: './form-exp-lab-borrar.component.html',
  styleUrls: ['./form-exp-lab-borrar.component.css']
})
export class FormExpLabBorrarComponent implements OnInit {
  //closeResult: string = '';
  //public isLogged = false;

  public idExpBorrar =0;
  public idPersona:number=1;//Modificarlo
  public expLab:ExpLab;
  public logoVacio:boolean;
  public imgVacia = "./assets/img/sin_imagen_V1.png";


  constructor(private modalService:NgbModal, private serviExpLab:ExpLabService,
          public expLabComp:ExpLabComponent, private imagenService:ImagenService,
          private spinner:NgxSpinnerService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.idExpBorrar = this.expLabComp.idExpBorrar;

    this.serviExpLab.traerExperiencia(this.idExpBorrar).subscribe(data=>{this.expLab=data;},
      err=>console.log(err)
    );

    this.logoVacio = this.imgNula();
    //console.log("******** 1 ***************");
    /* if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    } */
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      this.modalService.dismissAll();
      return `with: ${reason}`;
    }
  }

  public borrar_exp_lab():void {
    /* let imagenEnCloudinary:boolean = true;
    if(this.imgNula()) {
      imagenEnCloudinary = false;
    } */
    this.spinner.show();
    this.serviExpLab.borrarExperiencia(this.idExpBorrar).subscribe(
      data=>{
        if((this.expLab.idUrlLogo > 0) && !(this.logoVacio)){
          this.borrarImgNube(this.expLab.idUrlLogo);
        }
        this.spinner.hide();
        this.expLabComp.ngOnInit();
      },
      err=>{
        this.spinner.hide();
        console.log(err)
      }
    );

    this.modalService.dismissAll();
  }

  imgNula():boolean {
    const variable:string = this.expLab.urlLogo;
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

  fechaNula():boolean {
    const variable = this.expLab.fechaSalida;
    if( variable == null || variable == undefined) {
      return true;
    } else {
        return false;
      }
  }

  borrarImgNube(id: number): void {
    //this.spinner.show();

    this.imagenService.delete(id).subscribe(
      data => {
        //this.spinner.hide();
        //this.cargarImagenes();
      },
      err => {
        //this.spinner.hide();
        console.log(err);
      }
    );
  }

}
