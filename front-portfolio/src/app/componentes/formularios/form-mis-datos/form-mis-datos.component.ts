import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { MisDatosComponent } from '../../mis-datos/mis-datos.component';

@Component({
  selector: 'app-form-mis-datos',
  templateUrl: './form-mis-datos.component.html',
  styleUrls: ['./form-mis-datos.component.css']
})
export class FormMisDatosComponent implements OnInit {

  public id:number = 1;
  public perso:Persona;

  constructor(private modalService:NgbModal, private serviPer:PersonaService, private router:Router, private rutaActiv:ActivatedRoute, private misDatosComp:MisDatosComponent) { }

  ngOnInit(): void {
    //this.id = this.rutaActiv.snapshot.params.id;
    this.serviPer.mostrarPersona(this.id).subscribe(data=>{this.perso=data;},

      err=>console.log(err)
      );
  }

  public actualizar_persona():void {
    this.serviPer.modificarPersona(this.id, this.perso).subscribe(
      data=>{
        this.perso=data;
        //this.router.navigate(['']);
        //this.ngOnInit();
        this.misDatosComp.ngOnInit();
      },

      err=>console.log(err)
    );
                      //alert("Se actualizo con Exito");
                      //console.log("ID de la persona: "+perso.id);
                      /*console.log(perso.apellido +"-"+perso.email+"-"+perso.fechaNac+"-"+perso.id+"-"+perso.nombre+"-"+perso.password+
                                "-"+perso.titProfesional+"-"+perso.ubicacion+"-"+perso.urlBanner+"-"+perso.urlFoto);*/
                      console.log(this.perso.apellido +"-"+this.perso.email+"-"+this.perso.fechaNac+"-"+this.perso.id+"-"+this.perso.nombre+"-"+this.perso.password+
                                "-"+this.perso.titProfesional+"-"+this.perso.ubicacion+"-"+this.perso.urlBanner+"-"+this.perso.urlFoto);

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
