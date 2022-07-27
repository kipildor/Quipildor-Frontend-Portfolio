import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { ImgProy } from 'src/app/modelos/img-proy';
import { ImgProyService } from 'src/app/servicios/img-proy.service';
import { ImagenProyectoComponent } from '../../imagen-proyecto/imagen-proyecto.component';

@Component({
  selector: 'app-form-img-proyecto-modif',
  templateUrl: './form-img-proyecto-modif.component.html',
  styleUrls: ['./form-img-proyecto-modif.component.css']
})
export class FormImgProyectoModifComponent implements OnInit {

  //public idPersona:number=1;//Modificarlo
  public idProyecto:number=1;//Modificarlo
  //public anioActual:number=new Date(Date.now()).getFullYear();
  //public todaviaEstudiando:boolean=false;
  //public checkFecha:boolean=false;
  public imgProy:ImgProy= new ImgProy(null,0, '' ,0);
  public idImgModificar:number=0;
  public urlTemporal:string='';
  public idImgTemporal:number=0;
  public logoVacio:boolean;
  public imgVacia = "./assets/img/sin_imagen_V1.png";

  //************  Cloudinary  *************************
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;
  imagenRespuesta: Imagen = new Imagen('','','');
  direccionImagen:string;
  //imgRta:Imagen;
  cantCambios: number = 0;
  cont:number = 0;//borrarlo
  //***************************************************

  constructor(private modalService:NgbModal, private serviImgProy:ImgProyService,
              public imgProyComp:ImagenProyectoComponent, private imagenService:ImagenService,
              private router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.idImgModificar = this.imgProyComp.idImagenAEditar;

    this.serviImgProy.traerImagen(this.idImgModificar).subscribe(
      data=>{
        this.imgProy=data,
        this.algunasInicializaciones();
      },
      err=>console.log(err)
    );
    //this.logoVacio = this.imgNula();
  }

  public algunasInicializaciones():void{
    if(this.imgNula()) {
      this.logoVacio = true;
    }else{
      this.logoVacio = false;
      this.urlTemporal = this.imgProy.urlImg;
      this.idImgTemporal = this.imgProy.idUrlImg;
    }
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


  //*********  Clodinary  ******************************
  onFileChange(event) {
    this.cantCambios++;
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUploadMio(): void {
    this.imagenService.uploadFotoProyecto(this.imagen).subscribe(
      data => {
        this.imagenRespuesta=data;
        this.imgProy.urlImg=this.imagenRespuesta.imagenUrl;
        this.imgProy.idUrlImg=this.imagenRespuesta.id;//************************************************************ */

        this.modifImgProy();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
  //********************************************************

  public modificar_img_proy():void {
    if(this.cantCambios > 0) {
      this.spinner.show();

      this.onUploadMio();
    }else {
      //this.altaImgProy();
    }
  }

  public modifImgProy():void {
    this.serviImgProy.actualizarImagenProyecto(this.idImgModificar, this.imgProy).subscribe(
      data=>{
        this.imgProy=data;
        this.borrarImgHuerfana(this.idImgTemporal);
        this.imgProyComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
        this.spinner.hide();
      },
      err=>{
        console.log(err),
        this.spinner.hide();
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

  borrarImgHuerfana(id: number): void {
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
