import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService:NgbModal, private serviExpLab:ExpLabService,
                    public expLabComp:ExpLabComponent) { }

  ngOnInit(): void {
  }

  public agregar_exp_lab():void {
    this.serviExpLab.crearExperiencia(this.expLab).subscribe(
      data=>{
        this.expLab=data;
        this.expLabComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
      },
      err=>console.log(err)
    );
    this.modalService.dismissAll();
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

}
