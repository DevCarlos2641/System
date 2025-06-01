import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-searchArticle',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatDialogClose, MatInputModule, FormsModule, CurrencyPipe],
  templateUrl: './searchArticle.html',
  styleUrl: './searchArticle.css'
})
export class SearchArticle {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private dialogRef: MatDialogRef<SearchArticle>, @Inject(MAT_DIALOG_DATA) public data:any,){}

  value:String = "";
  dataSource:any;
  columnas:String[] = ["key", "name", "stock", "price"];

  ngOnInit(){
    this.dataSource = new MatTableDataSource(this.data.articles);
    this.dataSource.paginator = this.paginator;
    if(this.data.input !== "") this.dataSource.filter = this.data.input.trim().toLowerCase();
  }

  selectedArticle(){

  }

  filtrar(event: Event) {
    try{
      const filtro = (event.target as HTMLInputElement).value;
      this.value = filtro;
      this.dataSource.filter = filtro.trim().toLowerCase();
    } catch (e:any) {
      console.log((e as Error).message);
    }
  }

  show(value:any){
    console.log(value);
  }
}
