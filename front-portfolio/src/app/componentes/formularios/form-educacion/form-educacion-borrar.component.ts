import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { EducacionComponent } from '../../educacion/educacion.component';

@Component({
  selector: 'app-form-educacion-borrar',
  templateUrl: './form-educacion-borrar.component.html',
  styleUrls: ['./form-educacion-borrar.component.css']
})
export class FormEducacionBorrarComponent implements OnInit {

  public idEducBorrar =0;
  public idPersona:number=1;//Modificarlo
  public educ:Educacion;
  public logoVacio:boolean;
  public imgVacia = "./assets/img/sin_imagen_V1.png";


  constructor(private modalService:NgbModal, private serviEducacion:EducacionService,
          public educacionComp:EducacionComponent, private imagenService:ImagenService,
          private spinner:NgxSpinnerService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.idEducBorrar = this.educacionComp.idEducBorrar;

    this.serviEducacion.buscarEducacion(this.idEducBorrar).subscribe(data=>{this.educ=data;},
      err=>console.log(err)
    );
    this.logoVacio = this.imgNula();
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

  public borrar_educacion():void {//Botón
    this.spinner.show();
    this.serviEducacion.borrarEducacion(this.idEducBorrar).subscribe(
      data=>{
        if((this.educ.idUrlLogo > 0) && !(this.logoVacio)){
          this.borrarImgNube(this.educ.idUrlLogo);
        }
        this.spinner.hide();
        this.educacionComp.ngOnInit();
      },
      err=>{
        this.spinner.hide();
        console.log(err)
      }
    );
    this.modalService.dismissAll();
  }

  imgNula():boolean {
    const variable:string = this.educ.urlLogo;
    if( variable == null || variable == undefined || variable == "null" || variable == "undefined" || variable == "") {
      this.logoVacio =true;
      return true;
    } else {
        this.logoVacio = false;
        return false;
      }
  }

  fechaNula():boolean {
    const variable = this.educ.fechaFin;
    if( variable == null || variable == undefined) {
      return true;
    } else {
        return false;
      }
  }

  borrarImgNube(id: number): void {
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
