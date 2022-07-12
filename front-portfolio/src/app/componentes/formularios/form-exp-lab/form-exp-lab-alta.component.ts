import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';

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
  public expLab:ExpLab= new ExpLab(null,'',this.anioActual,this.anioActual,'',null,this.idPersona);

  //************  Cloudinary  *************************
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;
  imagenRespuesta: Imagen = new Imagen('','','');
  direccionLogo:string;
  //***************************************************

  constructor(private modalService:NgbModal, private serviExpLab:ExpLabService,
              public expLabComp:ExpLabComponent, private imagenService:ImagenService,
              private router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  /* public agregar_exp_lab():void {
    this.onUpload();
    console.log("Respuesta de la imagen: ");
    console.log(this.imagenRespuesta.name);

    console.log("Dentro de agregar_exp_lab -- url: "+this.imagenRespuesta.imagenUrl);
    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>console.log(err)
    );
    this.modalService.dismissAll();
  } */

  public async nueva_exp_lab_completa() {
    await this.onUpload();
    //this.direccionLogo =
    this.llamadas(this.fun1, this.fun2);

  }

  public llamadas(fun1, fun2) {
    fun1(fun2);
  }

  public fun1(fun2) {
    try {
      this.onUpload();
      this.expLab.urlLogo = this.direccionLogo;
     /*  console.log("1_exp lab: "+this.expLab.urlLogo);
      console.log("1_img resp: "+this.imagenRespuesta.imagenUrl); */
      console.log("1_ "+this.direccionLogo);
    } catch (error) {
      console.log(error);
      this.expLab.urlLogo = null;
    }
  }

  public fun2(agregar_exp_lab) {
    try {
      /* console.log("2_exp lab: "+this.expLab.urlLogo);
      console.log("2_img resp: "+this.imagenRespuesta.imagenUrl); */
      console.log("2_ "+this.direccionLogo);
      this.agregar_exp_lab();
    } catch (error) {
      console.log(error);
    }
  }



  public agregar_exp_lab():void {
    this.onUpload();
    //console.log("Respuesta de la imagen: ");
    //console.log(this.imagenRespuesta.name);

    /**************************************************************************
    Debería esperar a que se complete la subida de la imagen a Cloudinary para obtener
    la URL de la imagen que quiero guardarla tambien en un campo de otra tabla
    ***************************************************************************/
    this.expLab.urlLogo = this.imagenRespuesta.imagenUrl;//NO FUNCIONA TODAVÍA ESTÄ VACIO EL CAMPO

    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>console.log(err)
    );
    this.modalService.dismissAll();
    console.log("Dentro de agregar_exp_lab -- url: "+this.imagenRespuesta.imagenUrl);
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
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.spinner.show();
    this.imagenService.uploadLogoEmpresa(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        //this.router.navigate(['/']);
        this.imagenRespuesta=data;
        //console.log("Dentro de onUpload -- url--: "+this.imagenRespuesta.imagenUrl);
        //console.log("Dentro de onUpload -- DirImg--Antes: "+this.direccionLogo);
        this.direccionLogo = this.imagenRespuesta.imagenUrl;
        //console.log("Dentro de onUpload -- DirImg--Después: "+this.direccionLogo);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
    //console.log(this.imagenRespuesta.imagenUrl);
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
  //********************************************************

}
