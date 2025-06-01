import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchClient',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatDialogClose, MatInputModule, FormsModule],
  templateUrl: './searchClient.html',
  styleUrl: './searchClient.css'
})
export class SearchClient {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,){}

  dataSource:any;
  columnas:String[] = ["name", "rfc", "regimen"];

  ngOnInit(){
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  filtrar(event: Event) {
    try{
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    } catch (e:any) {
      console.log((e as Error).message);
    }
  }
}
