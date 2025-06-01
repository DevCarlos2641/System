import { Client } from "./Client";
import { Product } from "./Product";

export class SaleProducts{
  idSale:number;
  client = new Client();
  subTotal:number;
  total:number = 0;
  products:Product[] = [];
}
