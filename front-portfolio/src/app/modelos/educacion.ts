import { Estado } from './estado';
import { Persona } from './persona';

export class Educacion {
  idEduc: number;

  nombreInstit: string;

  fechaInicio: number;

  fechaFin: number;

  titulo: string;

  urlLogo: string;

  // FK
  perso: Persona;

  estado: Estado;

  //Constructores
  constructor(idEduc: number, nombreInstit: string, fechaInicio: number, fechaFin: number, titulo: string, urlLogo: string,
              perso: Persona, estado: Estado ) {
    this.idEduc = idEduc;
    this.nombreInstit = nombreInstit;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.titulo = titulo;
    this.urlLogo = urlLogo;

    this.perso = perso;
    this.estado = estado;
  }

  /*
    constructor(idEduc:number, nombreInstit:string, fechaInicio:Date, fechaFin:Date, titulo:string, urlLogo:string,
                persona_id : number, estado_id : number) {
        this.idEduc = idEduc;
        this.nombreInstit = nombreInstit;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.titulo = titulo;
        this.urlLogo = urlLogo;

        this.persona_id = persona_id;
        this.estado_id = estado_id;
    }
    */
}
