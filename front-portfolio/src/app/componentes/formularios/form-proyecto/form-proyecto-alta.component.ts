import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { ProyectosComponent } from '../../proyectos/proyectos.component';

@Component({
  selector: 'app-form-proyecto-alta',
  templateUrl: './form-proyecto-alta.component.html',
  styleUrls: ['./form-proyecto-alta.component.css']
})
export class FormProyectoAltaComponent implements OnInit {

  public idPersona:number=1;//Modificarlo
  public anioActual:number=new Date(Date.now()).getFullYear();
  //public todaviaTrabajando:boolean=false;
  //public checkFecha:boolean=false;
  public proy:Proyecto= new Proyecto(null,'',this.anioActual,'' ,'' ,'' ,'',this.idPersona);


  constructor(private modalService:NgbModal, private serviProyecto:ProyectoService,
              public proyectoComp:ProyectosComponent, private router:Router) { }

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

  public agregar_proyecto():void {//Botón

    //this.proy.urlGithub=this.proy.urlGithub.trim();
    //this.proy.urlPropia=this.proy.urlPropia.trim();
    if(!(this.urlVacia(this.proy.urlPropia))){
      if(!((this.proy.urlPropia.startsWith('https://')) || (this.proy.urlPropia.startsWith('http://')))) {
        this.proy.urlPropia = "http://" + this.proy.urlPropia;
      }
    }
    if(!(this.urlVacia(this.proy.urlGithub))){
      if(!((this.proy.urlGithub.startsWith('https://')) || (this.proy.urlGithub.startsWith('http://')))) {
        this.proy.urlGithub = "http://" + this.proy.urlGithub;
      }
    }

    this.serviProyecto.crearProyecto(this.proy).subscribe(
      data=>{
        this.proy=data;
        this.proyectoComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>{
        console.log(err)
      }
    );
    this.modalService.dismissAll();
  }

  urlVacia(urlBDD:string):boolean {
    //urlBDD=urlBDD.replace(/ /g, "");
    if( urlBDD == null || urlBDD == undefined || urlBDD == "null" || urlBDD == "undefined" || urlBDD == "") {
      return true;
    } else {
        return false;
      }
  }

}

