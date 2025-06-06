import { CurrencyPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../../../Services/Data.service';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../Services/Api.service';
import { DialogconsultSale } from './consultSale';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, FormsModule, CurrencyPipe,
          ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatIcon, MatButtonModule],
  providers: [],
  templateUrl: './consult.component.html',
  styleUrl: './styles.css'
})
export class ConsultComponent {

  dateI = new FormControl()
  dateF = new FormControl();
  filtro:string = "";
  allSales:any;
  dataSource:any;
  columnas:String[] = ["idSale", "date", "client", "total"];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private Api:ApiService, private Service:DataService,
              private Dialog:MatDialog){}

  ngOnInit(){
    let date = new Date();
    this.dateI = new FormControl(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    this.dateF = new FormControl(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    this.Api.Sales.get().subscribe(re=>{
      this.dataSource = new MatTableDataSource(re);
      this.allSales = this.dataSource.filteredData;
      this.dataSource.paginator = this.paginator;
      this.filterByDate()
    });
  }

  //  Filter for table
  filtrar() {
    try{
      this.dataSource.filter = this.filtro.trim().toLowerCase();
    } catch (e:any) {
      console.log((e as Error).message);
    }
  }

  filterByDate(){
    //  We change the filter value to empty and datasource
    this.filtro = "";
    this.dataSource.filter = this.filtro;

    //  Validate dates for null values
    if(this.dateI.value === null) return;
    if(this.dateF.value === null) return;

    let valuesOfDates:any = [];

    //  Validate sales by dates and add to array valuesOfDates
    for(let index in this.allSales){
      let dateSale = this.getDate(this.allSales[index].date);
      if(dateSale.getTime() >= this.dateI.value.getTime() &&
        dateSale.getTime() <= this.dateF.value.getTime()+86400000){
          valuesOfDates.push(this.allSales[index]);
      }
    }

    //  Update the table with the sales by dates
    this.dataSource = new MatTableDataSource(valuesOfDates);
  }

  protected getDate(dateString: String): Date{
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    // Recuerda que en JavaScript, el mes comienza desde 0, así que restamos 1 al mes
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  showProducts(row:any){
    const subs = this.Api.Sales.getProducts(row.idSale).subscribe(re=>{
      this.Dialog.open(DialogconsultSale, {data:[re, row]});
      subs.unsubscribe();
    })
  }
}

