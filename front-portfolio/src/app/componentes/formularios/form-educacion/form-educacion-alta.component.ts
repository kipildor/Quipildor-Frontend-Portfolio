import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { EducacionComponent } from '../../educacion/educacion.component';

@Component({
  selector: 'app-form-educacion-alta',
  templateUrl: './form-educacion-alta.component.html',
  styleUrls: ['./form-educacion-alta.component.css']
})
export class FormEducacionAltaComponent implements OnInit {

  public idPersona:number=1;//Modificarlo
  public anioActual:number=new Date(Date.now()).getFullYear();
  public todaviaEstudiando:boolean=false;
  //public checkFecha:boolean=false;
  public educ:Educacion= new Educacion(null,'' ,this.anioActual ,this.anioActual ,'' ,0 ,'' ,this.idPersona ,0);

  //************  Cloudinary  *************************
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;
  imagenRespuesta: Imagen = new Imagen('','','');
  direccionLogo:string;
  //imgRta:Imagen;
  cantCambios: number = 0;
  cont:number = 0;//borrarlo
  //***************************************************

  constructor(private modalService:NgbModal, private serviEduc:EducacionService,
              public educacionComp:EducacionComponent, private imagenService:ImagenService,
              private router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
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

  public cambioDelCheck(e) {
    if((e.target.checked)&&(this.todaviaEstudiando==true)) {
      this.educ.fechaFin = 2999;
      console.log("verdadero");
    }else{
      this.educ.fechaFin = this.anioActual;
      console.log("Falso");
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

  onUpload(): void {
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
  }

  onUploadMio(): void {
    //this.spinner.show();
    console.log("Paso 2 - onUploadMio");
    this.imagenService.uploadLogoEmpresa(this.imagen).subscribe(
      data => {
        //this.spinner.hide();
        //this.router.navigate(['/']);
        this.imagenRespuesta=data;
        this.educ.urlLogo=this.imagenRespuesta.imagenUrl;
        this.educ.idUrlLogo=this.imagenRespuesta.id;//************************************************************ */
        console.log("Paso 2.1 - onUploadMio MEDIO");
        this.altaEduc();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
    console.log("Paso 2.2 - onUploadMio FIN");
  }

  onUploadConResp(): boolean {
    //todoOk:boolean=true;
    this.spinner.show();
    this.imagenService.uploadLogoEmpresa(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        this.imagenRespuesta=data;

      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
        return false;
      }
    );
    return true;
  }


  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
  //********************************************************

  public agregar_educacion():void {
    if(this.cantCambios > 0) {
      this.spinner.show();
      console.log("Paso 1 - agregar_exp_lab");
      this.onUploadMio();

      console.log("Paso 1.2 - agregar_exp_lab FIN");
    }else {
      this.altaEduc();
    }
  }

  public altaEduc():void {
    console.log("Paso 3 - altaExpLab");
    this.serviEduc.crearEducacion(this.educ).subscribe(
      data=>{
        this.educ=data;
        console.log("Paso 3.1 - altaExpLab MEDIO");
        this.educacionComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
        this.spinner.hide();
      },
      err=>{
        console.log(err),
        this.spinner.hide();
      }
    );
    console.log("Paso 3.2 - altaExpLab FIN");
    this.modalService.dismissAll();
  }

}
