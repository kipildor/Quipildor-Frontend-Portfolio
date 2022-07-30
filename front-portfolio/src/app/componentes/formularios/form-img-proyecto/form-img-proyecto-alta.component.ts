import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { ImgProy } from 'src/app/modelos/img-proy';
import { ImgProyService } from 'src/app/servicios/img-proy.service';
import { ImagenProyectoComponent } from '../../imagen-proyecto/imagen-proyecto.component';

@Component({
  selector: 'app-form-img-proyecto-alta',
  templateUrl: './form-img-proyecto-alta.component.html',
  styleUrls: ['./form-img-proyecto-alta.component.css']
})
export class FormImgProyectoAltaComponent implements OnInit {

  @Input() proyectoID:number;
  public idPersona:number=1;//Modificarlo
  public idProyecto:number=1;//Modificarlo
  //public anioActual:number=new Date(Date.now()).getFullYear();
  //public todaviaEstudiando:boolean=false;
  //public checkFecha:boolean=false;
  public imgProy:ImgProy= new ImgProy(null,0, '' ,this.idProyecto);


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
    this.imgProy.proyecto_id = this.proyectoID;
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

  /* public cambioDelCheck(e) {
    if((e.target.checked)&&(this.todaviaEstudiando==true)) {
      this.educ.fechaFin = 2999;
      console.log("verdadero");
    }else{
      this.educ.fechaFin = this.anioActual;
      console.log("Falso");
    }
  } */

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

  /* onUpload(): void {
    this.spinner.show();
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  } */

  onUploadMio(): void {
    this.imagenService.uploadFotoProyecto(this.imagen).subscribe(
      data => {
        this.imagenRespuesta=data;
        this.imgProy.urlImg=this.imagenRespuesta.imagenUrl;
        this.imgProy.idUrlImg=this.imagenRespuesta.id;//************************************************************ */

        this.altaImgProy();
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

  public agregar_img_proy():void {
    if(this.cantCambios > 0) {
      this.spinner.show();

      this.onUploadMio();
    }else {
      //this.altaImgProy();
    }
  }

  public altaImgProy():void {
    this.serviImgProy.crearImagenProyecto(this.imgProy).subscribe(
      data=>{
        this.imgProy=data;
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

}
