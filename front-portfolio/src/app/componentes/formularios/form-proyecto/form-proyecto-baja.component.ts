import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/modelos/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { ProyectosComponent } from '../../proyectos/proyectos.component';

@Component({
  selector: 'app-form-proyecto-baja',
  templateUrl: './form-proyecto-baja.component.html',
  styleUrls: ['./form-proyecto-baja.component.css']
})
export class FormProyectoBajaComponent implements OnInit {

  public idPersona:number=1;//Modificarlo
  public idProyectoBorrar:number=0;
  public anioActual:number=new Date(Date.now()).getFullYear();
  public proy:Proyecto= new Proyecto(null,'',this.anioActual,'' ,'' ,'' ,'',this.idPersona);


  constructor(private modalService:NgbModal, private serviProyecto:ProyectoService,
              public proyectoComp:ProyectosComponent, private router:Router) { }

  ngOnInit(): void {
    this.idProyectoBorrar = this.proyectoComp.idProyectoBorrar;

    this.serviProyecto.traerProyecto(this.idProyectoBorrar).subscribe(
      data=>{
        this.proy=data
      },
      err=>{
        console.log(err)
      }
    );
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

  public borrar_proyecto():void {//Botón
    this.serviProyecto.borrarProyecto(this.idProyectoBorrar).subscribe(
      data=>{
        this.proyectoComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>{
        console.log(err)
      }
    );
    this.modalService.dismissAll();
  }

}
