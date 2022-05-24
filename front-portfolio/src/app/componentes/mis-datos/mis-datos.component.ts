import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PersonaByIdComponent } from './persona-by-id/persona-by-id.component';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public perso:Persona;
  //public persoById:PersonaByIdComponent;

  constructor(private servi:PersonaService, private router:Router) { }
  

  ngOnInit(): void {
    this.servi.mostrarPersona().subscribe(data=>{this.perso=data;})
  }

}
