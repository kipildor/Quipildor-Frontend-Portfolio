import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { HabilidadesComponent } from '../../habilidades/habilidades.component';

@Component({
  selector: 'app-form-habilidades-alta',
  templateUrl: './form-habilidades-alta.component.html',
  styleUrls: ['./form-habilidades-alta.component.css']
})
export class FormHabilidadesAltaComponent implements OnInit {

  public idPersona:number=1;//Modificarlo
  public skill:Habilidad= new Habilidad(null,'',0,0,this.idPersona);
  public arrayPorcentaje:number[]=[];

  constructor(private modalServ:NgbModal, private serviSkill:HabilidadService,
              public skillComp:HabilidadesComponent, private router:Router) { }

  ngOnInit(): void {
    this.cargarArray0a100();
  }



  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      this.modalServ.dismissAll();
      return `with: ${reason}`;
    }
  }

  /* public agregar_habilidad():void {

  } */

  public altaHabilidad():void {
    this.serviSkill.crearHabilidad(this.skill).subscribe(
      data=>{
        this.skill=data;

        this.skillComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>{
        console.log(err)
      }
    );
    this.modalServ.dismissAll();
  }

  public cargarArray0a100() {
    for(var i = 0; i <= 100; i++) {
      this.arrayPorcentaje.push(i);
    }
  }

}


