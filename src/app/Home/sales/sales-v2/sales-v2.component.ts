import { Component, EventEmitter, Inject, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../Services/Data.service';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { DialogFinishSale } from '../../Dialogs/Sales/finishSale';
import { SearchClient } from '../../Dialogs/Client/searchClient';
import {MatMenuModule} from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import {MatBadgeModule} from '@angular/material/badge';
import { animationComponent } from '../../../Animations/animation';
import { Product } from '../../../Objets/Product';
import { Article } from '../../../Objets/Article';
import { SaleProducts } from '../../../Objets/SaleProducts';

@Component({
  selector: 'app-sales-v2',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatPaginator, CommonModule,
          MatInputModule, FormsModule, MatMenuModule, MatCardModule, MatBadgeModule],
  animations:[animationComponent],
  templateUrl: './sales-v2.component.html',
  styleUrl: './sales-v2.component.css'
})
export class SalesV2Component {

  dataSource:any;
  data$:Observable<any>;
  input:string = "";
  Socket:SocketServiceLocal;
  subSocket:any = null;
  badge = true;
  badgeN = 0;

  imageUrl = "";

  sale = new SaleProducts();
  awaitSales:SaleProducts[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private Data: DataService, private Dialog:MatDialog,
              private cookies:CookieService ,
  ){}

  ngOnInit(){
    this.findDataSource();
    if(this.Data.sales.get() == undefined) return;
    this.sale = this.Data.sales.get();
    if(this.Data.sales.get().client.name != "Publico General"){
      this.cookies.set("RFC", this.sale.client.RFC);
      this.connectSocket();
      this.Socket.sendClientNotAwait();
    }
    this.awaitSales = this.Data.sales.getAwait();
    if(this.awaitSales.length > 0){
      this.badge = false;
      this.badgeN = this.awaitSales.length;
    }
    this.getTotal();
  }

  async findDataSource(){
    await new Promise(f => setTimeout(f, 100));
    this.dataSource = new MatTableDataSource(this.Data.articles.get());
    this.dataSource.paginator = this.paginator;
    this.data$ = this.dataSource._renderData;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filterWords = filter.trim().toLowerCase().split(' ');
      const name = data.name.toLowerCase()

      // Verifica que todas las palabras del filtro se encuentran en la cadena de datos
      return filterWords.every(word => name.includes(word) );
    };
  }

  filtrar() {
    this.dataSource.filter = this.input.trim().toLowerCase();
  }

  addSale(product:Article){
    for(let i in this.sale.products){
      if(this.sale.products[i].primaryK == product.primaryK){
        this.sale.products[i].addPieceSold();
        this.animateCardChange(Number(i));
        this.getTotal();
        if(this.sale.client.name != "Publico General")
          this.Socket.sendPieceSale("AddPieceSale",  Number(i));
        return;
      }
    }

    let prod = new Product();
    prod.primaryK = product.primaryK;
    prod.name = product.name;
    prod.piecesSold = 1;
    prod.price = product.price;
    prod.udm = product.udm;
    prod.total = 1*product.price;
    this.sale.products.push(prod);
    this.getTotal();
    if(this.sale.client.name != "Publico General")
      this.Socket.sendSale("AddSale", prod);
  }

  animateCardChange(i:number){
    let element = document.getElementsByClassName("cardProduct")[i];
    element.setAttribute("style", "background-color: rgb(17, 133, 228); transition: background-color 0.5s ease;");
    setTimeout(()=>{ element.setAttribute("style", "transition: background-color 0.5s ease;"); }, 500);
  }

  changePieces(index:number){
    const dialog = this.Dialog.open(DialogChange);
    dialog.afterClosed().subscribe(re=>{
      if(re == undefined) return;
      this.animateCardChange(index);
      this.sale.products[index].modificPieces(Number(re));
      if(this.sale.client.name != "Publico General")
        this.Socket.sendChangePieces("ChangePieces",  index, Number(re));
      this.getTotal();
    })
  }

  deleteSale(index:number){
    let element = document.getElementsByClassName("cardProduct")[index];
    element.setAttribute("style", "background-color: rgb(237, 34, 34); transition: background-color 0.5s ease;");
    setTimeout(()=>{
      element.setAttribute("style", "transition: background-color 0.5s ease;");
      let sale = this.sale.products[index];
      this.sale.products = this.sale.products.filter(key => key != sale);
      this.getTotal();
    }, 500);
    if(this.sale.client.name != "Publico General")
      this.Socket.sendDelete("DeleteSale", index);
  }

  cleanSales(){
    if(this.sale.client.name != "Publico General"){
      this.Socket.sendClean("CleanSales", "Clean");
      this.Socket.disconnect();
      this.subSocket.unsubscribe();
    }
    this.sale = new SaleProducts();
    this.cookies.set("RFC", "");
  }

  ngOnDestroy(){
    this.Data.sales.set(this.sale);
    this.Data.sales.setAwait(this.awaitSales);
  }

  getTotal(){
    this.sale.total = this.sale.products.reduce((ac, v) => ac+v.total, 0);
  }

  finishSales(){
    if(this.sale.total != 0){
      const dialog = this.Dialog.open(DialogFinishSale, {data: this.sale})
      dialog.afterClosed().subscribe(re=>{
        if(re !== "OK") return;
        this.Data.changeArticles(this.sale.products);
        // this.Socket.sendFinishSales();
        this.cleanSales();
      })
    }
  }

  findClient(){
    const dialogOpen = this.Dialog.open(SearchClient, {data:this.Data.clients.get()});
    dialogOpen.afterClosed().subscribe(re=>{
      if(re === undefined) return;
      this.sale.client = this.Data.clients.getByRfc(re);
      this.cookies.set("RFC", this.sale.client.RFC);
      if(this.Socket != undefined){
        this.Socket.sendClientChange("ChangeClient");
        this.Socket.disconnect();
        this.subSocket.unsubscribe();
      }
      if(this.sale.client.name != "Publico General")
        this.connectSocket();
    });
  }

  connectSocket(){
    this.Socket = new SocketServiceLocal(
      this.cookies.get("Enterprise"), this.cookies.get("RFC"));

    if(this.sale.products.length > 0) this.Socket.sendSales("Sales", this.sale);
    this.subSocket = this.Socket.callBack.subscribe(re=>{
      if(re == "Android"){
        if(this.sale.products.length != 0)
          this.Socket.sendSales("Sales", this.sale)
      }
    })
  }

  findProduct(){
    let product = this.Data.articles.getByPrimaryK(this.input);
    if(product != undefined){
      this.addSale(product);
    }
  }

  //  Code for sales in await

  inWaiting(){
    if(this.sale.products.length != 0){
      this.awaitSales.push(this.sale);
      if(this.sale.client.name != "Publico General")
        this.Socket.sendClientInAwait("ClientAwait");
      this.cleanSales();
      this.badgeN = this.awaitSales.length;
      this.badge = false;
    }
  }

  showSales(){
    let dialog = this.Dialog.open(DialogShowSales, {data: this.awaitSales})
    dialog.afterClosed().subscribe(re=>{
      if(re != undefined){
        if(this.sale.products.length > 0) this.inWaiting();
        this.sale = re;
        this.awaitSales = this.awaitSales.filter(wait => wait != re);
        this.cookies.set("RFC", this.sale.client.RFC);
        if(this.sale.client.name != "Publico General"){
          this.connectSocket();
          this.Socket.sendClientNotAwait();
        }
        this.badgeN = this.awaitSales.length;
        if(this.awaitSales.length == 0)
          this.badge = true;
      }
    })
  }

  showImg(primaryK: string){
    const value = this.Data.articles.getUrlByPrimaryK(primaryK);
    if(value.length != 0){
      this.imageUrl = "http://localhost:3000/File/imageArticle/"+value;
    } else this.imageUrl = "";
  }

  deleteImg(){
    this.imageUrl = "";
  }
}

@Component({
  selector: 'dialogChange',
  template: `
    <form #formArticle="ngForm" (ngSubmit)="change(formArticle)" style="margin: 10px;">
      <mat-form-field class="example-full-width">
        <mat-label>Pieces</mat-label>
        <input matInput name="value" type="number" ngModel>
      </mat-form-field>
      <button mat-button style="margin-left: 10px;">Ok</button>
    </form>
  `,
  imports: [MatInputModule, FormsModule, MatButtonModule],
  standalone: true
})
class DialogChange{
  constructor( public dialogRef: MatDialogRef<DialogChange>) {}

  change(form:NgForm){
    if(form.value.value == undefined) return
    if(Number(form.value.value) == 0) return;
    this.dialogRef.close(Number(form.value.value))
  }
}


@Component({
  selector: 'dialogShowSales',
  template: `
  <div style="margin: 10px">
    <h2 style="text-align: center;">Sales</h2>
    <div style="margin: 10px;">
      @for(sale of data; track $index){
        <div class="card" [mat-dialog-close]="sale">
          <div class="title">
            <p style="padding-left: 10px">Productos: {{sale.products.length}}</p>
            <p style="padding-right: 10px">{{sale.client.name}}</p>
          </div>
          <p style="padding: 0 0 10px 0; text-align:center;">Total: {{sale.total | currency}}</p>
        </div>
      }
    </div>
  </div>
  `,
  styles:`
    .card{width:400px; margin: 10px; box-shadow: 10px 5px 5px rgb(206, 206, 206);
      background-color: rgb(255, 255, 255); border-radius: 10px;}
    .title{display:flex; flex-wrap: wrap; justify-content: space-between; padding: 10px 0 0 0}
    .card:hover{color: white; background-color: rgb(10  , 73, 123);
      transition: background-color 0.5s ease;cursor: pointer;}
  `,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatDialogClose],
  standalone: true
})
class DialogShowSales{

  constructor( public dialogRef: MatDialogRef<DialogChange>, @Inject(MAT_DIALOG_DATA) public data:any,) {}

}


export class SocketServiceLocal extends Socket{

  callBack: EventEmitter<any> = new EventEmitter();

  constructor(enterprise:String, clientName:String) {
    super({
      url: 'http://localhost:3000',
      options:{
        query:{
          name: enterprise+"-"+clientName
        }
      }
    });
    this.ioSocket.on('GetSales', (res:any)=>this.callBack.emit(res));
  }

  sendSale(message:string, data:any){
    this.ioSocket.emit(message, data);
  }

  sendPieceSale(message: string, index: number){
    this.ioSocket.emit(message, {index});
  }

  sendSales(message: string, sales:SaleProducts){
    this.ioSocket.emit(message, sales);
  }

  sendClean(message: string, txt: string){
    this.ioSocket.emit(message, txt);
  }

  sendDelete(message: string, index: number){
    this.ioSocket.emit(message, {index});
  }

  sendChangePieces(message: string, index:number, pieces:number){
    this.ioSocket.emit(message, {index, pieces});
  }

  sendClientChange(message: string){
    this.ioSocket.emit(message, "Cambio de cliente");
  }

  sendClientInAwait(message: string){
    this.ioSocket.emit(message, "Await");
  }

  sendClientNotAwait(){
    this.ioSocket.emit("ClientNotAwait", "NotAwait");
  }

  sendFinishSales(){
    this.ioSocket.emit("FinishSales", "Finish");
  }

}
