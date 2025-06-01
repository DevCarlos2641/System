import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatButtonModule,
          MatIconModule, FormsModule, MatFormFieldModule, MatExpansionModule,
          MatListModule, CurrencyPipe, RouterOutlet, RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)' }),
        animate('500ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateY(220px)' }),
          style({ transform: 'translateY(-10px)' }),
          style({ transform: 'translateY(0px)' }),
        ])),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate('500ms ease-in', keyframes([
          style({ transform: 'translateX(10px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateX(-500px)', offset: 1 }),
        ])),
      ]),
    ])
  ]
})

export class SalesComponent {

  // @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // @ViewChild('inputFocus') input!: ElementRef;

  // constructor(private Service:DataService, private dialog:MatDialog,
  //             @Inject(DOCUMENT) private document: Document, private Settings:SettingsService){}

  // columnas:String[] = ["description", "pieces", "price", "subtotal", "total", "delete"];
  // sales:Sale[] = [];
  // value:String = "";
  // openDialog:boolean = false;
  // animations:boolean = true;
  // selected:number = 0;
  // styleS:string = "background-color: rgba(255, 192, 203, 0.75); cursor:pointer"
  // style:string = "cursor: pointer;"
  // total:number = 0;
  // wait:boolean = false;
  // waitNumber:string = "";
  // table:any;

  // tableFocus:boolean = false;
  // inputFocus:boolean = false;

  // client:any = {name:"Publico General"};

  // //  Funcionamiento Con Teclado

  // ngOnInit(){
  //   var scope = this;
  //   let styleS = scope.styleS;
  //   let style= scope.style;

  //   this.animations = this.Settings.getAnimations();
  //   this.sales = this.Service.getSales()[0];
  //   this.client = this.Service.getSales()[1];
  //   this.total = this.Service.getTotal();
  //   this.table = this.document.getElementById("table");

  //   this.document.addEventListener("keydown", function(event) {
  //     if(scope.openDialog) return;
  //     if(scope.inputFocus) return;
  //     if((Number(event.keyCode) >= 65 && Number(event.keyCode) <= 90))
  //       scope.focusInput();
  //     if(!scope.tableFocus) return;
  //     console.log(event.key)
  //     const element = document.getElementsByClassName("selected");

  //     /*if(event.key === "Backspace"){
  //       if(scope.verificSelected()) scope.deleteArticle(scope.sales[scope.selected]);
  //       if(scope.selected === scope.sales.length && scope.selected != 0){
  //         scope.selected--;
  //         const element = document.getElementsByClassName("selected"+scope.selected);
  //         element[0].setAttribute("style", styleS);
  //       }
  //     }*/

  //     if(event.key === "ArrowLeft" || event.key === "-"){
  //       if(scope.verificSelected()) {
  //         scope.sales[scope.selected].restPiece();
  //         scope.setTotal();
  //       }
  //     }

  //     if(event.key == "ArrowRight" || event.key === "+"){
  //       if(scope.verificSelected()) {
  //         scope.sales[scope.selected].addPiece();
  //         scope.setTotal();
  //       }
  //     }

  //     if(event.key === "ArrowUp"){

  //       if(scope.selected === 0){ return; }
  //       element[scope.selected].setAttribute("style", style);
  //       scope.selected--;
  //       element[scope.selected].setAttribute("style", styleS);

  //     }

  //     if(event.key === "ArrowDown"){

  //       scope.selected++;
  //       if(element[scope.selected] === undefined) { scope.selected--; return;}

  //       element[scope.selected-1].setAttribute("style", style);
  //       element[scope.selected].setAttribute("style", styleS);
  //     }

  //     if(Number(event.key) >= 0 && Number(event.key) <= 9 || event.key === '.'){
  //       if(scope.wait){
  //         scope.waitNumber += event.key;
  //       } else {
  //         scope.wait = true;
  //         scope.waitNumber += event.key;
  //         setTimeout(function(){
  //           scope.wait = false;
  //           scope.waitNumber = "";
  //         }, 1000);
  //       }
  //       if(element[scope.selected] === undefined) return;
  //       if(Number(scope.waitNumber) === 0) return;
  //       if(element[scope.selected].getAttribute("style") === scope.styleS)
  //         scope.sales[scope.selected].modificPieces(Number(scope.waitNumber));
  //       scope.setTotal();
  //     }

  //     //  Para Configurar
  //     // if(event.key === ""){
  //     //   if(!scope.openDialog){
  //     //     const form = <NgForm>{ value: { value: "" } };
  //     //     scope.search(form);
  //     //   }
  //     // }

  //   });
  // }

  // setTotal(){
  //   this.total = 0;
  //   for(let i in this.sales)
  //     this.total += this.sales[i].getTotal();
  // }

  // selectedS(sel:number){
  //   let element = document.getElementsByClassName("selected")
  //   if(element[this.selected] === undefined) { this.selected--; return; }
  //   element[this.selected].setAttribute("style", this.style);
  //   element[sel].setAttribute("style", this.styleS);
  //   this.selected = sel;
  // }

  // verificSelected(){
  //   const element = document.getElementsByClassName("selected");
  //   if(element[this.selected] === undefined) return false;
  //   return (element[this.selected].getAttribute("style") === this.styleS);
  // }

  // //  //  //  //  //  //


  // //  Busca Articulos
  // search(form:NgForm){
  //   if(this.openDialog) return;
  //   this.openDialog = true;
  //   const dialogOpen = this.dialog.open(SearchArticle, {data:{articles:this.Service.articles.get(), input:form.value.value}});
  //   dialogOpen.afterClosed().subscribe(res=>{
  //     this.focusInput();
  //     this.openDialog = false;
  //     if(res === undefined) return;
  //     let re = res[0];
  //     this.value = res[1];
  //     let sale = new Sale();
  //     sale.setPrimaryK(re.primaryK);
  //     sale.setName(re.name);
  //     sale.setPieces(1);
  //     sale.setPrice(re.price);
  //     sale.setSubtotal(1*re.price);
  //     sale.setTotal(1*re.price);

  //     for(let v in this.sales){
  //       if(this.sales[v].getPrimaryK() === sale.getPrimaryK()){
  //         this.sales[v].addPiece();
  //         this.setTotal();
  //         return;
  //       }
  //     }
  //     //
  //     this.sales.push(sale);
  //     this.setTotal();
  //   });
  // }

  // searchClient(){
  //   const dialogOpen = this.dialog.open(SearchClient, {data:this.Service.clients.get()});
  //   dialogOpen.afterClosed().subscribe(re=>{
  //     if(re === undefined) return;
  //     console.log(re);
  //     this.client = Object.values(re)[0];
  //   });
  // }

  // cleanSales(){
  //   if(this.sales.length === 0) return
  //   const dialog = this.dialog.open(DialogConfirmClean)
  //   dialog.afterClosed().subscribe(re=>{
  //     if(!re) return;
  //     this.clean();
  //     this.focusInput();
  //   })
  // }

  // clean(){
  //   this.sales = [];
  //   this.total = 0;
  //   this.selected = 0;
  // }

  // deleteArticle(sale:Sale, index:number){
  //   setTimeout(()=>{
  //     this.sales = this.sales.filter(key => key != sale);
  //     this.setTotal();
  //   }, 500);
  //   let deleteSale = this.sales[index];
  //   this.sales = this.sales.filter(key => key != sale);
  //   this.sales.push(deleteSale);
  // }

  // focusTable(){
  //   this.table.setAttribute("style", "background-color: rgba(230, 230, 230, 0.5); border-radius: 10px;")
  //   this.inputFocus = false;
  //   this.tableFocus = true;
  // }

  // focusInput(){
  //   this.input.nativeElement.focus();
  //   this.table.setAttribute("style", "")
  //   this.inputFocus = true;
  //   this.tableFocus = false;
  // }

  // finish(){
  //   if(this.total != 0){
  //     this.openDialog = true;
  //     const dialogOpen = this.dialog.open(DialogFinishSale, {data:[this.sales, this.total, this.client]});
  //     dialogOpen.afterClosed().subscribe(re=>{
  //       this.openDialog = false;
  //       if(re !== "OK") return;
  //       this.clean();
  //       setTimeout(()=>{
  //         console.log("actualizar");
  //         // this.Service.findArticles();
  //       }, 1000);
  //     })
  //   }
  // }

  // ngOnDestroy(){
  //   this.Service.setSales([this.sales, this.client]);
  //   this.Service.setTotal(this.total);
  // }

}

@Component({
  selector: 'dialog-confirmClean',
  template: `
          <body style="margin: 20px;">
            <h1>¿Desea Eliminar La Lista De Venta?</h1>
            <button mat-raised-button style="margin-right: 20px;" [mat-dialog-close]='true'>Si</button>
            <button mat-raised-button [mat-dialog-close]='false'>No</button>
          </body>
          `,
  styles: ``,
  imports:[MatButtonModule, MatDialogClose],
  standalone: true,
})

export class DialogConfirmClean{

  constructor( public dialogRef: MatDialogRef<DialogConfirmClean>){}

}
