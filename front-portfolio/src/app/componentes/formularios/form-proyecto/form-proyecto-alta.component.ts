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

}

