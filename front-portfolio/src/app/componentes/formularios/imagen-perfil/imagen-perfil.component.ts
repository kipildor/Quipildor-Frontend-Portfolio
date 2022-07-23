import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { MisDatosComponent } from '../../mis-datos/mis-datos.component';

@Component({
  selector: 'app-imagen-perfil',
  templateUrl: './imagen-perfil.component.html',
  styleUrls: ['./imagen-perfil.component.css']
})
export class ImagenPerfilComponent implements OnInit {
  public idPersona:number = 1;//Cambiarlo
  public perso:Persona;
  public fotoPerfilVacia:boolean;//La URL que viene de la BD si el campo esta vacio
  public quitarImagenPerfil:boolean=false;
  public urlTemporalPerfil:string='';
  public idImgTemporalPerfil:number=0;
  //************  Cloudinary  *************************
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;
  imagenRespuestaPerfil: Imagen = new Imagen('','','');
  direccionPerfil:string;
  //imgRta:Imagen;
  cantCambiosPerfil: number = 0;
  //cont:number = 0;//borrarlo
  //***************************************************
  /********** Para el Banner *************************/
  public fotoBannerVacia:boolean;//La URL que viene de la BD si el campo esta vacio
  public quitarImagenBanner:boolean=false;
  public urlTemporalBanner:string='';
  public idImgTemporalBanner:number=0;
  @ViewChild('imagenInputFileBanner', {static: false}) imagenFileBanner: ElementRef;
  imagenBanner: File;
  imagenMinBanner: File;
  imagenRespuestaBanner: Imagen = new Imagen('','','');
  direccionBanner:string;
  cantCambiosBanner: number = 0;
  /************ Fin para el banner *******************/

  constructor(private modalService:NgbModal, private serviPer:PersonaService,
            public misDatosComp:MisDatosComponent, private imagenService:ImagenService,
            private spinner:NgxSpinnerService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.serviPer.mostrarPersona(this.idPersona).subscribe(
      data=>{
        this.perso=data,
        this.algunasInicializaciones();
      },
      err=>console.log(err)
    );


  }

  public algunasInicializaciones():void{

    if(this.imgNula(this.perso.urlFoto)) {
      this.fotoPerfilVacia = true;
    }else{
      this.fotoPerfilVacia = false;
      this.urlTemporalPerfil = this.perso.urlFoto;
      this.idImgTemporalPerfil = this.perso.idUrlFoto;
    }

    if(this.imgNula(this.perso.urlBanner)) {
      this.fotoBannerVacia = true;
    }else{
      this.fotoBannerVacia = false;
      this.urlTemporalBanner = this.perso.urlBanner;
      this.idImgTemporalBanner = this.perso.idUrlBanner;
    }
  }

  imgNula(url:string):boolean {
    //const variable:string = this.expLab.urlLogo;
    if( url == null || url == undefined || url == "null" || url == "undefined" || url == "") {
      //console.log("2_ "+this.expLab.urlLogo);
      //this.logoVacio =true;
      return true;
    } else {
        //console.log("2_ "+this.expLab.urlLogo);
        //this.logoVacio = false;
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

  public cambioDelCheckImagenPerfil(e) {
    if((e.target.checked)&&(this.quitarImagenPerfil==true)) {

      this.perso.urlFoto = '';
      this.perso.idUrlFoto = 0;
      console.log("verdadero");
    }else{
      this.perso.urlFoto = this.urlTemporalPerfil;
      this.perso.idUrlFoto = this.idImgTemporalPerfil;
      console.log("Falso");
    }
  }




  public modif_imagenes():void {//Llamada del botón
    if(((this.cantCambiosPerfil > 0)&&(this.quitarImagenPerfil==false)) || ((this.cantCambiosBanner > 0)&&(this.quitarImagenBanner==false))) {
      this.spinner.show();
      if((this.cantCambiosPerfil > 0)&&(this.quitarImagenPerfil==false)) {
        console.log("Paso 1 - agregar_exp_lab - Perfil");
        this.onUploadMio();

        console.log("Paso 1.2 - agregar_exp_lab - Perfil - FIN");
      }
      if((this.cantCambiosBanner > 0)&&(this.quitarImagenBanner==false)) {
        console.log("Paso 1 - agregar_exp_lab - Banner");
        this.onUploadMioBanner();

        console.log("Paso 1.2 - agregar_exp_lab - Banner - FIN");
      }

    }else {
      //No se cambió la imagen (así que no se sube una) o hay que quitar la imagen que ya había
      this.modifImagenes();
    }
  }

  public modifImagenes():void {
    console.log("Paso 3 - altaExpLab");
    this.serviPer.modificarPersona(this.idPersona, this.perso).subscribe(
      data=>{
        this.perso=data;
        console.log("Paso 3.1 - altaExpLab MEDIO");
        this.borrarImgHuerfanaPerfil();
        this.borrarImgHuerfanaBanner();
        this.misDatosComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
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

  public borrarImgHuerfanaPerfil():void {
    if((this.idImgTemporalPerfil > 0) && ((this.cantCambiosPerfil > 0) || (this.quitarImagenPerfil == true))) {
      this.imagenService.delete(this.idImgTemporalPerfil).subscribe(
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
    this.cantCambiosPerfil++;
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUploadMio(): void {//Graba con una imagen nueva en el input File
    //this.spinner.show();
    console.log("Paso 2 - onUploadMio");
    this.imagenService.uploadFotoPerfil(this.imagen).subscribe(
      data => {

        this.imagenRespuestaPerfil=data;
        this.perso.urlFoto=this.imagenRespuestaPerfil.imagenUrl;
        this.perso.idUrlFoto=this.imagenRespuestaPerfil.id;
        console.log("Paso 2.1 - onUploadMio MEDIO");
        this.modifImagenes(); /* *************************************************************** */
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
    console.log("Paso 2.2 - onUploadMio FIN");
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
  //************ Banner - Cloudinary  ************************
  onFileChangeBanner(event) {
    this.cantCambiosBanner++;
    this.imagenBanner = event.target.files[0];
    const fr2 = new FileReader();/* fr */
    fr2.onload = (evento: any) => {
      this.imagenMinBanner = evento.target.result;
    };
    fr2.readAsDataURL(this.imagenBanner);
  }

  onUploadMioBanner(): void {//Graba con una imagen nueva en el input File
    //this.spinner.show();
    console.log("Paso 2 - onUploadMio");
    this.imagenService.uploadFotoPerfil(this.imagenBanner).subscribe(
      data => {

        this.imagenRespuestaBanner=data;
        this.perso.urlBanner=this.imagenRespuestaBanner.imagenUrl;
        this.perso.idUrlBanner=this.imagenRespuestaBanner.id;
        console.log("Paso 2.1 - onUploadMio MEDIO");
        this.modifImagenes();/**************************************************************************/
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.resetBanner();
      }
    );
    console.log("Paso 2.2 - onUploadMio FIN");
  }

  resetBanner(): void {
    this.imagenBanner = null;
    this.imagenMinBanner = null;
    this.imagenFileBanner.nativeElement.value = '';
  }
  //************ FIN Banner - Cloudinary  ************************
  //************ Banner - funciones replicadas  ************************
  public cambioDelCheckImagenBanner(e) {
    if((e.target.checked)&&(this.quitarImagenBanner==true)) {

      this.perso.urlBanner = '';
      this.perso.idUrlBanner = 0;
      console.log("verdadero");
    }else{
      this.perso.urlBanner = this.urlTemporalBanner;
      this.perso.idUrlBanner = this.idImgTemporalBanner;
      console.log("Falso");
    }
  }

  public borrarImgHuerfanaBanner():void {
    if((this.idImgTemporalBanner > 0) && ((this.cantCambiosBanner > 0) || (this.quitarImagenBanner == true))) {
      this.imagenService.delete(this.idImgTemporalBanner).subscribe(
        data => {
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
