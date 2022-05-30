export class AcercaDe {

    idParrafo? : number;
    
    parrafo : string;
    
    posicion : number;

    //FK
    persona_id : number;

    //Constructores
    constructor(idParrafo:number, parrafo:string, posicion:number, 
                persona_id : number) {
        this.idParrafo = idParrafo;
        this.parrafo = parrafo;
        this.posicion = posicion;
        
        this.persona_id = persona_id;
    }


}
