export class Persona {

    id? : number;

    nombre : string;
    
    apellido : string;
    
    fechaNac : Date;
    
    email : string;
    
    urlFoto : string;

    urlBanner : string;
    
    password? : string;
    
    ubicacion : string;
    
    titProfesional : string;
    
    actividadActual : string;

    //Constructores
    constructor(id:number, nombre:string, apellido:string, fechaNac:Date, email:string, 
                urlFoto:string, urlBanner:string, password:string, ubicacion:string, 
                titProfesional:string, actividadActual:string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNac = fechaNac;
        this.email = email;
        this.urlFoto = urlFoto;
        this.urlBanner = urlBanner;
        this.password = password;
        this.ubicacion = ubicacion;
        this.titProfesional = titProfesional;
        this.actividadActual = actividadActual;
    }
/*
    constructor(nombre:string, apellido:string, fechaNac:Date, email:string, 
                urlFoto:string, urlBanner:string, password:string, ubicacion:string, 
                titProfesional:string, actividadActual:string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNac = fechaNac;
        this.email = email;
        this.urlFoto = urlFoto;
        this.urlBanner = urlBanner;
        this.password = password;
        this.ubicacion = ubicacion;
        this.titProfesional = titProfesional;
        this.actividadActual = actividadActual;
    }
*/

}
