import { Product } from "./Product";

export class Sale{
  idSale:number;
  idUser:number;
  methodPay:string;
  date:string;
  RFC:string;
  total:number = 0;
  products:Product[] = [];
}
