import { Injectable } from "@angular/core";
import { Article } from "../../Objets/Article";
import { Client } from "../../Objets/Client";
import { SaleProducts } from "../../Objets/SaleProducts";
import { Product } from "../../Objets/Product";

@Injectable({providedIn: 'root'})
export class SalesData{

  private sale = new SaleProducts();
  private salesAwait:SaleProducts[] = [];

  set(sale:SaleProducts){ this.sale = sale; }

  get():SaleProducts{ return this.sale; }

  setAwait(salesAwait:SaleProducts[]){this.salesAwait = salesAwait}
  addAwait(sale:SaleProducts){this.salesAwait.push(sale)}
  getAwait(){return this.salesAwait}

  refreshArticle(article:Article){
    if(this.sale.products.length == 0) return;
    this.sale.products = this.sale.products.map(v => {
      if(v.primaryK == article.primaryK)
        return this.parse(article, v);
      else return v
    })
  }

  private parse(article:Article, v:Product): Product{
    const prod:Product = new Product();
    prod.primaryK = v.primaryK;
    prod.name = article.name;
    prod.piecesSold = v.piecesSold;
    prod.price = article.price;
    prod.total = article.price * v.piecesSold;
    return prod;
  }

  refreshClient(client:Client){
    this.sale.client = client;
  }

}
