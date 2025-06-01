import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from "@angular/material/dialog";
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'dialog-brands',
  templateUrl: './brandsView.html',
  styleUrls:['./brandsView.css'],
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatDividerModule,
            MatInputModule, MatDialogClose, MatListModule],
})
export class DialogBrandsView {

  valuesView:String[] = [];

  constructor(public dialogRef: MatDialogRef<DialogBrandsView>, @Inject(MAT_DIALOG_DATA) public data:String[],) {}

  ngOnInit(){
    this.valuesView = this.data;

  }

  filtrar(event: Event){
    const filtro = (event.target as HTMLInputElement).value;
    this.valuesView = this.data.filter(name => name.includes(filtro.trim()));
  }

}
