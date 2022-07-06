import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/jwt/service/token.service';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public listaHabilid : Habilidad[] = [];
  public isLogged = false;

  constructor(private router:Router, private serviHabilid:HabilidadService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.serviHabilid.listarHabilidades().subscribe(data=>{this.listaHabilid=data});

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log("Logueado mis datos:"+this.isLogged);
  }

}
