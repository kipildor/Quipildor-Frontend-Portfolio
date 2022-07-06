import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/jwt/service/token.service';
import { ExpLab } from 'src/app/modelos/exp-lab';
import { ExpLabService } from 'src/app/servicios/exp-lab.service';

@Component({
  selector: 'app-exp-lab',
  templateUrl: './exp-lab.component.html',
  styleUrls: ['./exp-lab.component.css']
})
export class ExpLabComponent implements OnInit {

  public listaExp : ExpLab[]=[];
  public isLogged = false;
  //public todavia : string = "Hasta el momento...";

  constructor(private router:Router, private serviExp:ExpLabService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.serviExp.listarExperiencias().subscribe(data=>{this.listaExp=data});

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado exp Laboral:"+this.isLogged);
  }

}
