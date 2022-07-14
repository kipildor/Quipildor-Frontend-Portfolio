import { LoginComponent } from "../jwt/auth/login.component";

export class ExpLab {

    idExp?:number;

    nombreEmp:string;

    fechaIng:number;

    fechaSalida:number;

    descripcion:string;

    idUrlLogo:number;

    urlLogo:string;

    // FK
    persona_id : number;

    //Constructores
    constructor(idExp:number, nombreEmp:string, fechaIng:number, fechaSalida:number, descripcion:string, idUrlLogo:number,
              urlLogo:string, persona_id : number) {
        this.idExp = idExp;
        this.nombreEmp = nombreEmp;
        this.fechaIng = fechaIng;
        this.fechaSalida = fechaSalida;
        this.descripcion = descripcion;
        this.idUrlLogo = idUrlLogo;
        this.urlLogo = urlLogo;

        this.persona_id = persona_id;
    }
}
