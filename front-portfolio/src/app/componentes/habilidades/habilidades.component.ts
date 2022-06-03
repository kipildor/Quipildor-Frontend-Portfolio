import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public listaHabilid : Habilidad[] = [];

  constructor(private router:Router, private serviHabilid:HabilidadService) { }

  ngOnInit(): void {
    this.serviHabilid.listarHabilidades().subscribe(data=>{this.listaHabilid=data});
  }

}
