import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../Services/Api.service';
import { DataService } from '../../Services/Data.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { dialogQuoteStatus } from './Dialogs/quoteStatus';
import { Quote } from '../../Objets/Interfaces';
import { MatIcon } from '@angular/material/icon';
import { dialogShowQuote } from './Dialogs/showQuote';
import { Router } from '@angular/router';
import { SocketService } from '../../Services/Socket.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, MatIcon, MatSelectModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})
export class QuotesComponent {

  columnas: string[] = ['idQuote', 'name', 'date', 'status', "icon"];
  dataSource:any;
  quotes:Quote[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private Api:ApiService,public Data: DataService, private Dialog: MatDialog,
            private router:Router, private socket:SocketService){}

  ngOnInit(){
    this.quotes = this.Data.getQuotes();
    this.setDatasource();
    this.socket.callBack.subscribe(re=>{
      re.idQuote = this.quotes.length+1;
      re.date = new Date(re.date).toLocaleString()
      this.quotes.push(re);
      this.dataSource.data = this.quotes;
    })
  }

  showStatus(quote:Quote){
    const dialog = this.Dialog.open(dialogQuoteStatus, {data: quote});
    dialog.afterClosed().subscribe(re=>{
      if(re == undefined) return;
      if(re == "Finalizado")
        this.socket.emitClientQuote(quote.RFC, quote.idQuote);
      quote.status = re;
      this.dataSource.filter = this.dataSource.filter
      if(quote.status == "Entregado"){
        this.Api.Quotes.update(quote).subscribe(re=>{
          console.log(re);
        })
      }
    });
  }

  setDatasource(){
    this.dataSource = new MatTableDataSource(this.quotes);
    this.dataSource.filter = "revisión";
    this.dataSource.paginator = this.paginator;
  }

  showQuote(quote: Quote){
    const dialog = this.Dialog.open(dialogShowQuote, {data:{quote}});
    dialog.afterClosed().subscribe(re=>{
      if(re == "Surtiendo") {
        quote.status = re;
        this.router.navigate(['/Home/SalesV2']);
        return
      }
      else if(quote.status == "Revisión")
        quote.status = "En espera";
      this.dataSource.filter = this.dataSource.filter;
    });
  }

  changeFilter(event:string){
    this.dataSource.filter = event;
  }

  ngOnDestroy(){
    this.Data.setQuotes(this.quotes);
  }

}
