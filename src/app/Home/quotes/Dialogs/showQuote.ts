import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../Services/Api.service';
import { DataService } from '../../../Services/Data.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../Objets/Product';
import { SaleProducts } from '../../../Objets/SaleProducts';
import { Quote } from '../../../Objets/Interfaces';

@Component({
  selector: 'app-searchClient',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule],
  templateUrl: './showQuote.html',
  styleUrl: './styles.css'
})
export class dialogShowQuote {

  products$:Product[] = [];
  total:number = 0;
  serviceData = inject(DataService)
  quote:Quote;

  constructor(private dialogRef: MatDialogRef<dialogShowQuote>, @Inject(MAT_DIALOG_DATA) public data:any,
            private Api:ApiService, private Data:DataService){
              this.quote = data.quote;
            }

  ngOnInit(){
    if(this.quote.products != undefined)
      this.setSales(this.quote.products);
    else
      this.Api.Quotes.getProducts(this.quote.idQuote).subscribe(re=>{
        this.setSales(re);
      });
  }

  setSales(re:any){
    for(let v of re){
      const product = this.Data.articles.getByPrimaryK(v.primaryK);
      let prod= new Product();
      prod.primaryK = product.primaryK;
      prod.name = product.name;
      prod.piecesSold = v.pieces;
      prod.price = product.price;
      prod.total = product.price * prod.piecesSold;
      this.products$.push(prod)
    }
    this.products$.sort((c, d)=> c.name.toLowerCase().charCodeAt(0) - d.name.toLowerCase().charCodeAt(0))
  }

  getTotal():number{
    this.total = 0;
    for(let p of this.products$){
      this.total += p.total;
    }
    return this.total;
  }

  sendQuote(){
    let sale = new SaleProducts()
    sale.idSale = 0;
    sale.client = this.serviceData.clients.getByRfc(this.quote.RFC);
    sale.products = this.products$;
    sale.total = this.total;
    this.Data.sales.addAwait(sale);
    this.dialogRef.close("Surtiendo");
  }

}
