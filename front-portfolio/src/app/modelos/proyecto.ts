export class Proyecto {

    idProyecto?:number;

    nombreProy:string;

    fechaProy:number;

    descripcion:string;

    urlGithub:string;

    urlPropia:string;

    tecnologia:string;

    // FK
    persona_id : number;

    //Constructores
    constructor(idProyecto:number, nombreProy:string, fechaProy:number, descripcion:string, urlGithub:string, urlPropia:string,
                tecnologia:string, persona_id : number) {
    this.idProyecto = idProyecto;
    this.nombreProy = nombreProy;
    this.fechaProy = fechaProy;
    this.descripcion = descripcion;
    this.urlGithub = urlGithub;
    this.urlPropia = urlPropia;
    this.tecnologia = tecnologia;

    this.persona_id = persona_id;
    }

}
