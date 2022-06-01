import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';

@Component({
  selector: 'app-exp-lab',
  templateUrl: './exp-lab.component.html',
  styleUrls: ['./exp-lab.component.css']
})
export class ExpLabComponent implements OnInit {

  public listaExp : ExpLab[]=[];
  //public todavia : string = "Hasta el momento...";

  constructor(private router:Router, private serviExp:ExpLabService) { }

  ngOnInit(): void {
    this.serviExp.listarExperiencias().subscribe(data=>{this.listaExp=data});
  }

}
