export class ImgProy {

    idImgProy?:number;

    idUrlImg: number;

    urlImg: string;

    // FK
    proyecto_id : number;

    //Constructores
    constructor(idImgProy:number, idUrlImg:number, urlImg:string,
                proyecto_id : number) {
        this.idImgProy = idImgProy;
        this.idUrlImg = idUrlImg;
        this.urlImg = urlImg;

        this.proyecto_id = proyecto_id;
    }

}
