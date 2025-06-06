import { CurrencyPipe } from "@angular/common";
import { Component, ElementRef, Inject, ViewChild, DOCUMENT } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import { ApiService } from "../../../Services/Api.service";
import { SaleProducts } from "../../../Objets/SaleProducts";
import { Sale } from "../../../Objets/Sale";

@Component({
  selector: 'dialog-finishSale',
  templateUrl: './finishSale.html',
  styleUrl: './finishSale.css',
  providers: [],
  imports:[MatButtonModule, CurrencyPipe,
          MatInputModule, FormsModule, MatFormFieldModule, MatRadioModule],
  standalone: true,
})

export class DialogFinishSale{

  @ViewChild('inputFocus') input!: ElementRef;

  metodo:string = "Efectivo";
  finish:boolean = false;
  countArticles:number = 0;
  cambio:number = 0;
  sale = new Sale();


  constructor( public dialogRef: MatDialogRef<DialogFinishSale>,
            @Inject(MAT_DIALOG_DATA) public data:SaleProducts, @Inject(DOCUMENT) private document: Document,
            private Express:ApiService){
            this.countArticles = data.products.length;
            this.sale.idSale = data.idSale;
            this.sale.idUser = 0;
            this.sale.total = data.total;
            this.sale.products = data.products;
            this.sale.RFC = data.client.RFC;
  }

  ngOnInit(){
    let scope = this;
    this.document.addEventListener("keydown", function(event){
      if(Number(event.key) >= 0 && Number(event.key) <= 9){
        scope.input.nativeElement.focus();
      }
    });
  }

  changeMetodo(metodo:any){
    this.input.nativeElement.focus();
    this.metodo = metodo;
  }

  finalizar(){
    this.sale.methodPay = this.metodo;
    this.sale.date = new Date().toLocaleString()
    if(this.finish){
      //    With Express
      //    insertSale entail the change of stock in the articulo, and add register in the table Sale and salesProducts
      this.Express.Sales.insert(this.sale).subscribe(re=>{
        if(re.res !== "OK") { alert("Algo salio mal intente de nuevo"); return; }
        this.dialogRef.close("OK");
      })
    }
  }

  checkMonto(value:string){
    let monto = Number(value)
    const element = document.getElementsByClassName("montoValue");
    if(monto < this.sale.total){
      this.finish = false;
      element[0].setAttribute("style", "font-size: x-large; color: red;");
      this.cambio = 0;
    }
    else{
      this.finish = true;
      this.cambio = monto - this.sale.total;
      element[0].setAttribute("style", "font-size: x-large; color: black;");
    }
  }

}
