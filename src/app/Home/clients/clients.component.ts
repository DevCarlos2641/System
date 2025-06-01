import { Component, input, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../Objets/Client';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../../Services/Data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModificClient } from './dialogs/clientModific';
import { ApiService } from '../../Services/Api.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule,
            MatTabsModule, MatIconModule, MatPaginatorModule, MatTableModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent{

  constructor(private Service:DataService,
            private dialog:MatDialog, private Express:ApiService){}

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  input:string = "";
  dataSource:any;
  columnas: string[] = ['rfc', 'name', 'address', 'email', 'tel'];

  ngOnInit(){
    this.findClients();
  }

  async findClients(){
    await new Promise(f => setTimeout(f, 500));
    this.dataSource = new MatTableDataSource(this.Service.clients.get());
    this.dataSource.paginator = this.paginator;
  }

  addClient(form:NgForm){
    let client = new Client();
    client.setName(String(form.value.name).trim());
    client.setRFC(String(form.value.rfc).trim());
    client.setRegimen(String(form.value.regimen).trim());
    client.setRazonSocial(String(form.value.razon).trim());
    client.setAddress(String(form.value.address).trim());
    client.setCP(Number(form.value.cp));
    client.setEmail(String(this.emailFormControl.value).trim());
    client.setTel(String(form.value.tel).trim());

    if(client.verifiedDatas()){
      this.Express.Clients.verific(client.getRFC(), client.getEmail(), client.getTel()).subscribe(re=>{
        if(re.res === "Exist") { alert("Cliente Existente, RFC, Email Y Telefono Son Unicos"); return; }
        this.Express.Clients.insert(client).subscribe(re=>{
          if(re.res === "Exist") { alert("Cliente Existente, RFC, Email Y Telefono Son Unicos"); return; }
          this.Service.clients.push(client);
          this.findClients();
        })
        form.resetForm();
        this.emailFormControl.reset();
      })
    }
    else alert("Favor De LLenar Correctamente Los Datos");
  }

  filtrar() {
    this.dataSource.filter = this.input.trim().toLowerCase();
  }

  modificClient(rfc:string){
    const dialog =this.dialog.open(DialogModificClient,
      {data:{client: this.Service.clients.getByRfc(rfc)}});
    dialog.afterClosed().subscribe(re=>{
      if(re != "OK") return
      this.findClients();
    })
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
