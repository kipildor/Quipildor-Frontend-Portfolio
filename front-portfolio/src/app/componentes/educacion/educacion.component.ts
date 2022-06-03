import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public listaEducacion : Educacion[] = [];

  constructor(private router:Router, private serviEduc:EducacionService) { }

  ngOnInit(): void {
    this.serviEduc.listarEduc().subscribe(data=>{this.listaEducacion=data});
  }

}
