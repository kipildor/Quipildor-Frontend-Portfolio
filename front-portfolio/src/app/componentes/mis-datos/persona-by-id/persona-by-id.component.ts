import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from '../../../servicios/persona.service';

@Component({
  selector: 'app-persona-by-id',
  templateUrl: './persona-by-id.component.html',
  styleUrls: ['./persona-by-id.component.css']
})
export class PersonaByIdComponent implements OnInit {

  perso : Persona;

  constructor(private servi:PersonaService, private router:Router) { }

  ngOnInit(): void {
    this.servi.mostrarPersona().subscribe(data=>{this.perso=data;})
  }

}
