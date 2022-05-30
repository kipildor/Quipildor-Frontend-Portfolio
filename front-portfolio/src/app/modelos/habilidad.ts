export class Habilidad {

    idHabilidad?:number;
    
    tecnologia:string;
    
    porcentaje:number;
    
    posicion:number;

    // FK
    persona_id : number;

    //Constructores
    constructor(idHabilidad:number, tecnologia:string, porcentaje:number, posicion:number,
                persona_id : number) {
        this.idHabilidad = idHabilidad;
        this.tecnologia = tecnologia;
        this.porcentaje = porcentaje;
        this.posicion = posicion;

        this.persona_id = persona_id;
    }
    
}
