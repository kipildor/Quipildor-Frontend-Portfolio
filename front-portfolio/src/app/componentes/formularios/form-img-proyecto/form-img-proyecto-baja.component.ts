import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { ImgProy } from 'src/app/modelos/img-proy';
import { ImgProyService } from 'src/app/servicios/img-proy.service';
import { ImagenProyectoComponent } from '../../imagen-proyecto/imagen-proyecto.component';

@Component({
  selector: 'app-form-img-proyecto-baja',
  templateUrl: './form-img-proyecto-baja.component.html',
  styleUrls: ['./form-img-proyecto-baja.component.css']
})
export class FormImgProyectoBajaComponent implements OnInit {

  //public idPersona:number=1;//Modificarlo
  //public idProyecto:number=1;//Modificarlo
  //public anioActual:number=new Date(Date.now()).getFullYear();
  //public todaviaEstudiando:boolean=false;
  //public checkFecha:boolean=false;
  public imgProy:ImgProy= new ImgProy(null,0, '' ,0);
  public idImgBorrar:number=0;
  public logoVacio:boolean;
  public imgVacia = "./assets/img/sin_imagen_V1.png";
/*
  //************  Cloudinary  *************************
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;
  imagenRespuesta: Imagen = new Imagen('','','');
  direccionImagen:string;
  //imgRta:Imagen;
  cantCambios: number = 0;
  cont:number = 0;//borrarlo
  //************************************************ */

  constructor(private modalService:NgbModal, private serviImgProy:ImgProyService,
              public imgProyComp:ImagenProyectoComponent, private imagenService:ImagenService,
              private router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.idImgBorrar = this.imgProyComp.idImagenABorrar;

    this.serviImgProy.traerImagen(this.idImgBorrar).subscribe(data=>{this.imgProy=data;},
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

  public borrar_img_proy():void {
    this.spinner.show();
    this.serviImgProy.borrarImagenProyecto(this.idImgBorrar).subscribe(
      data=>{
        if((this.imgProy.idImgProy > 0) && !(this.logoVacio)){
          this.borrarImgNube(this.imgProy.idUrlImg);
        }
        this.spinner.hide();
        this.imgProyComp.ngOnInit();
      },
      err=>{
        this.spinner.hide();
        console.log(err)
      }
    );
    this.modalService.dismissAll();
  }

  imgNula():boolean {
    const variable:string = this.imgProy.urlImg;
    if( variable == null || variable == undefined || variable == "null" || variable == "undefined" || variable == "") {
      this.logoVacio =true;
      return true;
    } else {
        this.logoVacio = false;
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
