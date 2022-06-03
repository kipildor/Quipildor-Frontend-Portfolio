export class ExpLab {

    idExp?:number;

    nombreEmp:string;

    fechaIng:number;

    fechaSalida:number;

    descripcion:string;

    urlLogo:string;

    // FK
    persona_id : number;

    //Constructores
    constructor(idExp:number, nombreEmp:string, fechaIng:number, fechaSalida:number, descripcion:string, urlLogo:string,
                persona_id : number) {
        this.idExp = idExp;
        this.nombreEmp = nombreEmp;
        this.fechaIng = fechaIng;
        this.fechaSalida = fechaSalida;
        this.descripcion = descripcion;
        this.urlLogo = urlLogo;

        this.persona_id = persona_id;
    }
}
