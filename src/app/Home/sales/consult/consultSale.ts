import { CurrencyPipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'dialog-consult-sale',
  template: `
  <div class="body">
    <div class="header">
      <p>Fecha: {{data[1].date}}</p>
      <p>Cliente: {{data[1].RFC}}</p>
    </div> <hr>

    <div style="margin: 10px;">
      <table>
        <tr>
          <th>--</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Total</th>
        </tr>
        @for(value of data[0]; track $index){
          <tr>
            <td>{{value.pieces}} {{value.udm}}</td>
            <td>{{value.name}} @if(value.udm == "package"){ {{value.pieces}} Piezas }</td>
            <td>{{value.price | currency}}</td>
            <td>{{value.pieces * value.price | currency}}</td>
          </tr>
        }

        <tr style="text-align: center;">
          <td>Total</td>
          <td>--</td>
          <td>--</td>
          <td>{{data[1].total | currency}}</td>
        </tr>
      </table>
    </div>
  </div>
  `,
  styleUrl: "./styles.css",
  providers: [],
  imports:[CurrencyPipe],
  standalone: true,
})

export class DialogconsultSale{

  constructor( public dialogRef: MatDialogRef<DialogconsultSale>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
}
