export class Product{
    constructor(
   public _id:string,
   public pName:string,
   public pDescription:string,
   public pRating:number,
   public pCategory:string,
   public price:number,
   public color:string,
   public image:any,
   public specification:string,
   public dateFirstAvailable:Date,
   public dateLastAvailable:Date,
   public pSeller:any
    ){}
}





