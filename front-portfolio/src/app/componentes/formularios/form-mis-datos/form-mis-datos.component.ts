import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { MisDatosComponent } from '../../mis-datos/mis-datos.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-mis-datos',
  templateUrl: './form-mis-datos.component.html',
  styleUrls: ['./form-mis-datos.component.css']
})
export class FormMisDatosComponent implements OnInit {

  public id:number = 1;
  public perso:Persona;
  public fg:FormGroup;

  constructor(private modalService:NgbModal, private serviPer:PersonaService, private router:Router,
            private rutaActiv:ActivatedRoute, private misDatosComp:MisDatosComponent, public fb:FormBuilder) { }

  crearFormulario() {
    this.fg = new FormGroup({
      nombre : new FormControl('', [Validators.required, Validators.min(1)]),
      apellido : new FormControl('', [Validators.required]),
      /* ubicacion : new FormControl("", [Validators.required]),
      titulo : new FormControl("", [Validators.required]),
      actividad : new FormControl("", [Validators.required]),
      id_persona : new FormControl("") */
    });

    //this.cargarFormu();
  }

  ngOnInit(): void {



    this.serviPer.mostrarPersona(this.id).subscribe(data=>{this.perso=data;},
      err=>console.log(err)
    );

    this.crearFormulario();
    //this.cargarFormu();
    //this.buildForm();
    this.fg.get('nombre').patchValue(this.perso.nombre);
    /*  */


  }

  cargarFormu() {
    this.fg.patchValue({
      nombre: this.perso.nombre,
      apellido: this.perso.apellido,
      /* ubicacion: this.perso.ubicacion,
      titulo: this.perso.titProfesional,
      actividad: this.perso.actividadActual,
      id_persona: this.perso.id */
    });

  }

  /* private buildForm(){
    var nombreF = this.perso.nombre;
    var apellidoF = this.perso.apellido;
    var ubicacionF = this.perso.ubicacion;
    var tituloF = this.perso.titProfesional;
    var actividadF = this.perso.actividadActual;
    var id_personaF = this.perso.id;
    this.fg = this.fb.group({
      nombre: [nombreF, [Validators.required]],
      apellido: [apellidoF, [Validators.required]],
      ubicacion: [ubicacionF, [Validators.required]],
      titulo: [tituloF, [Validators.required]],
      actividad: [actividadF, [Validators.required]],
      id_persona: [id_personaF, [Validators.required]]
    });
  } */

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
