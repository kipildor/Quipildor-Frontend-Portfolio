import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcercaDe } from 'src/app/modelos/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component';

@Component({
  selector: 'app-form-acerca-de',
  templateUrl: './form-acerca-de.component.html',
  styleUrls: ['./form-acerca-de.component.css']
})
export class FormAcercaDeComponent implements OnInit {

  public idParrafo:number = 1;//modificarlooooo
  public acerca:AcercaDe;
  //public fg:FormGroup;

  constructor(private modalService:NgbModal, private serviAcerca:AcercaDeService/*, private router:Router,
            private rutaActiv:ActivatedRoute*/, public acercaDeComp:AcercaDeComponent/*, public fb:FormBuilder*/) { }

  ngOnInit(): void {
    this.idParrafo = this.acercaDeComp.parrActual;

    this.serviAcerca.traerParrafo(this.idParrafo).subscribe(data=>{this.acerca=data;},
      err=>console.log(err)
    );
    console.log("Revisar");
    console.log("id="+this.acerca.idParrafo+" cont="+this.acerca.parrafo);
  }

  public actualizar_parrafo():void {
    //console.log(this.acerca.parrafo);
    this.serviAcerca.actualizarParrafo(this.idParrafo, this.acerca).subscribe(
      data=>{
        this.acerca=data;
        this.acercaDeComp.ngOnInit();
      },
      err=>console.log(err)
    );
    //console.log(this.acerca.idParrafo +"-"+this.acerca.parrafo+"-"+this.acerca.posicion+"-"+this.acerca.persona_id);
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
