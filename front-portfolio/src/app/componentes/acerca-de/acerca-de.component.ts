import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcercaDe } from 'src/app/modelos/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  public acerca:AcercaDe[]=[];

  constructor(private router:Router, private serviAcerca:AcercaDeService) { }

  ngOnInit(): void {
    this.serviAcerca.listarParrafos().subscribe(data=>{this.acerca=data});
  }

}
