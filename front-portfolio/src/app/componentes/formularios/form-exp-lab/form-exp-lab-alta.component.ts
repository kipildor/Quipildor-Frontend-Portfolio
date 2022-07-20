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

  /* public agregar_exp_lab():void {
    this.onUpload();

    this.expLab.urlLogo = this.imagenRespuesta.imagenUrl;
    console.log(this.imagenRespuesta.name);
    console.log("Dentro de agregar_exp_lab -- url: "+this.imagenRespuesta.imagenUrl);

    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>console.log(err)
    );
    //this.modalService.dismissAll();
  } */

  /* async nueva_exp_lab_completa() {
    this.spinner.show();
    let imagenRespuesta:Imagen = await this.onUpload()
    //this.direccionLogo = imagenRespuesta.imagenUrl;
    //this.llamadas(this.fun1, this.fun2);

      .then(this.expLab.urlLogo = this.imagenRespuesta.imagenUrl);
    this.expLab.idUrlLogo = await imagenRespuesta.id;

    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
        this.spinner.hide();
        this.modalService.dismissAll();
      },
      err=>{
        console.log(err);
        this.spinner.hide();
        this.modalService.dismissAll();
      }
    );
    //this.modalService.dismissAll();
  }

  public llamadas(fun1, fun2) {
    fun1(fun2);
  }

  public fun1(fun2) {
    try {
      this.onUpload();
      this.expLab.urlLogo = this.direccionLogo;

      console.log("1_ "+this.direccionLogo);
    } catch (error) {
      console.log(error);
      this.expLab.urlLogo = null;
    }
  }

  public fun2(agregar_exp_lab) {
    try {

      console.log("2_ "+this.direccionLogo);
      this.agregar_exp_lab();
    } catch (error) {
      console.log(error);
    }
  } */

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
    /*    .subscribe(
        data => {
        this.serviExpLab.crearExperiencia(this.expLab);
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
        err=>console.log(err)
      ); */

      //this.onUpload();

      //this.expLab.urlLogo = this.imagenRespuesta.imagenUrl;
      //console.log(this.imagenRespuesta.name);
      //console.log("Dentro de agregar_exp_lab -- url: "+this.imagenRespuesta.imagenUrl);

      /* this.serviExpLab.crearExperienciaConlogo(this.expLab).subscribe(
        data=>{
          this.expLab=data;
          this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
        },
        err=>console.log(err)
      ); */
      //this.modalService.dismissAll();
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


