import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcercaDe } from 'src/app/modelos/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component';

@Component({
  selector: 'app-form-acerca-de-alta',
  templateUrl: './form-acerca-de-alta.component.html',
  styleUrls: ['./form-acerca-de-alta.component.css']
})
export class FormAcercaDeAltaComponent implements OnInit {

  public persona_id:number = 1;//modificarlooooo
  public posicion:number = 99;//modificarlo
  public acerca:AcercaDe=new AcercaDe(null,'',this.posicion,this.persona_id);

  constructor(private modalService:NgbModal, private serviAcerca:AcercaDeService/*, private router:Router,
            private rutaActiv:ActivatedRoute*/, public acercaDeComp:AcercaDeComponent/*, public fb:FormBuilder*/) { }

  ngOnInit(): void {
    //this.idParrafo = this.acercaDeComp.parrActual;
    /* this.acerca.persona_id = this.persona_id;
    this.acerca.posicion = this.posicion; */
  }

  public crear_parrafo():void {
    console.log("ID persona: "+this.acerca.persona_id);
    this.serviAcerca.crearParrafo(this.acerca).subscribe(
      data=>{
        this.acerca=data;
        this.acercaDeComp.ngOnInit();//Esto recarga el componente para que se actualice la vista
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
