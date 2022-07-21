import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { TokenService } from 'src/app/jwt/service/token.service';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';
import { ExpLabComponent } from '../../exp-lab/exp-lab.component';

@Component({
  selector: 'app-form-exp-lab-modif',
  templateUrl: './form-exp-lab-modif.component.html',
  styleUrls: ['./form-exp-lab-modif.component.css']
})
export class FormExpLabModifComponent implements OnInit {
  public idExpModif =0;
  public idPersona:number=1;//Modificarlo
  public expLab:ExpLab;
  public anioActual:number=new Date(Date.now()).getFullYear();
  public todaviaTrabajando:boolean=false;
  public logoVacio:boolean;//La URL que viene de la BD si el campo esta vacio
  public quitarImagen:boolean=false;
  public urlTemporal:string='';
  public idImgTemporal:number=0;
  //public imgVacia = "./assets/img/sin_imagen_V1.png";
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

  constructor(private modalService:NgbModal, private serviExpLab:ExpLabService,
            public expLabComp:ExpLabComponent, private imagenService:ImagenService,
            private spinner:NgxSpinnerService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.idExpModif = this.expLabComp.idExpEditar;

    this.serviExpLab.traerExperiencia(this.idExpModif).subscribe(
      data=>{
        this.expLab=data,
        this.algunasInicializaciones();
      },
      err=>{
        console.log(err)
      }
    );
  }

  public algunasInicializaciones():void{
    if(this.expLab.fechaSalida==2999 || this.expLab.fechaSalida==null){
      this.todaviaTrabajando=true;
    }else {
      this.todaviaTrabajando=false;
    }

    if(this.imgNula()) {
      this.logoVacio = true;
    }else{
      this.logoVacio = false;
      this.urlTemporal = this.expLab.urlLogo;
      this.idImgTemporal = this.expLab.idUrlLogo;
    }

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
    if((e.target.checked)&&(this.todaviaTrabajando==true)) {
      this.expLab.fechaSalida = 2999;
      //console.log("verdadero");
    }else{
      this.expLab.fechaSalida = this.anioActual;
      //console.log("Falso");
    }
  }

  public cambioDelCheckImagen(e) {
    if((e.target.checked)&&(this.quitarImagen==true)) {
      //this.urlTemporal = this.expLab.urlLogo;
      this.expLab.urlLogo = '';
      this.expLab.idUrlLogo = 0;
      console.log("verdadero");
    }else{
      this.expLab.urlLogo = this.urlTemporal;
      this.expLab.idUrlLogo = this.idImgTemporal;
      console.log("Falso");
    }
  }


  public modif_exp_lab():void {//Llamada del botón
    if((this.cantCambios > 0)&&(this.quitarImagen==false)) {
      //Se cambió la imagen y no hay que quitar la imagen nueva ** ¡¡!! Si habia una imagen, hay que borrarla
      this.spinner.show();
      console.log("Paso 1 - agregar_exp_lab");
      this.onUploadMio();

      console.log("Paso 1.2 - agregar_exp_lab FIN");
    }else {
      //No se cambió la imagen (así que no se sube una) o hay que quitar la imagen que ya había
      this.modifExpLab();
    }
  }

  public modifExpLab():void {
    console.log("Paso 3 - altaExpLab");
    this.serviExpLab.actualizarExperiencia(this.idExpModif, this.expLab).subscribe(
      data=>{
        this.expLab=data;
        console.log("Paso 3.1 - altaExpLab MEDIO");
        this.borrarImgHuerfana();
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
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

  public borrarImgHuerfana():void {
    if((this.idImgTemporal > 0) && ((this.cantCambios > 0) || (this.quitarImagen == true))) {
      this.imagenService.delete(this.idImgTemporal).subscribe(
        data => {
        },
        err => {
          console.log(err);
        }
      );
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

  /* onFileChangeMio(event) {
    this.cantCambios++;
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  } */

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

  onUploadMio(): void {//Graba con una imagen nueva en el input File
    //this.spinner.show();
    console.log("Paso 2 - onUploadMio");
    this.imagenService.uploadLogoEmpresa(this.imagen).subscribe(
      data => {

        this.imagenRespuesta=data;
        this.expLab.urlLogo=this.imagenRespuesta.imagenUrl;
        this.expLab.idUrlLogo=this.imagenRespuesta.id;
        console.log("Paso 2.1 - onUploadMio MEDIO");
        this.modifExpLab();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
    console.log("Paso 2.2 - onUploadMio FIN");
  }

  /* onUploadConResp(): boolean {
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
  } */


  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
  //********************************************************

}
