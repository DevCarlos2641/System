import { inject, Injectable } from '@angular/core';
import { Quote } from '../Objets/Interfaces';
import { ArticlesData } from './DataObjets/ArticlesData';
import { ClientData } from './DataObjets/ClientsData';
import { ApiService } from './Api.service';
import { SalesData } from './DataObjets/SalesData';
import { Product } from '../Objets/Product';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  articles = inject(ArticlesData);
  clients = inject(ClientData);
  sales = inject(SalesData);

  private total:number = 0;
  private quotes:Quote[] = [];

  constructor(private Express:ApiService){}

  findQuotes(){
    this.Express.Quotes.get().subscribe(re=>{
      this.quotes = re;
    });
  }
  setQuotes(quotes:Quote[]){this.quotes = quotes}
  getQuotes(){return this.quotes;}

  setTotal(total:number){ this.total = total; }
  getTotal(){ return this.total; }


  changeArticles(products:Product[]){
    // change stock in the articles local
    for(let i of products)
      this.articles.modificStcok(i.primaryK, i.piecesSold)

    // this.articles.getNewMerch().map(v=> v.i)

  }
}
