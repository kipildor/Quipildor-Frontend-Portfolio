export class ImgProy {

    idImgProy?:number;
    
    urlImg: string;

    // FK
    proyecto_id : number;
    
    //Constructores
    constructor(idImgProy:number, urlImg:string,
                proyecto_id : number) {
        this.idImgProy = idImgProy;
        this.urlImg = urlImg;

        this.proyecto_id = proyecto_id;
    }
    
}
