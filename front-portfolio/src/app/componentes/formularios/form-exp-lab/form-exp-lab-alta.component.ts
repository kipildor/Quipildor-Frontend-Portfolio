import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { async, finalize } from 'rxjs';

import { Imagen } from 'src/app/cloudinary/models/imagen';
import { ImagenService } from 'src/app/cloudinary/services/imagen.service';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';
import { ExpLabComponent } from '../../exp-lab/exp-lab.component';

@Component({
  selector: 'app-form-exp-lab-alta',
  templateUrl: './form-exp-lab-alta.component.html',
  styleUrls: ['./form-exp-lab-alta.component.css']
})
export class FormExpLabAltaComponent implements OnInit {

  public idPersona:number=1;//Modificarlo
  public anioActual:number=new Date(Date.now()).getFullYear();
  public todaviaTrabajando:boolean=false;
  //public checkFecha:boolean=false;
  public expLab:ExpLab= new ExpLab(null,'',this.anioActual,this.anioActual,'',null,null,this.idPersona);

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
    if((e.target.checked)&&(this.todaviaTrabajando==true)) {
      this.expLab.fechaSalida = 2999;
      console.log("verdadero");
    }else{
      this.expLab.fechaSalida = this.anioActual;
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
        this.expLab.urlLogo=this.imagenRespuesta.imagenUrl;
        this.expLab.idUrlLogo=this.imagenRespuesta.id;
        console.log("Paso 2.1 - onUploadMio MEDIO");
        this.altaExpLab();
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

  public agregar_exp_lab():void {
    if(this.cantCambios > 0) {
      this.spinner.show();
      console.log("Paso 1 - agregar_exp_lab");
      this.onUploadMio();

      console.log("Paso 1.2 - agregar_exp_lab FIN");
    }else {
      this.altaExpLab();
    }
  }

  public altaExpLab():void {
    console.log("Paso 3 - altaExpLab");
    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        console.log("Paso 3.1 - altaExpLab MEDIO");
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

}


