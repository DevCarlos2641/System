import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {} from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MyErrorStateMatcher } from "../clients.component";
import { Client } from "../../../Objets/Client";
import { ApiService } from "../../../Services/Api.service";
import { DataService } from "../../../Services/Data.service";

@Component({
  selector: 'dialog-modificClient',
  templateUrl: './clientModific.html',
  styleUrls:['./clientModific.css'],
  providers:[],
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule,
    MatInputModule,ReactiveFormsModule],
})

export class DialogModificClient{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  client:Client = new Client();

  constructor(private Express:ApiService, private Service:DataService,
    public dialogRef: MatDialogRef<DialogModificClient>, @Inject(MAT_DIALOG_DATA) public data:any) {
      this.emailFormControl.setValue(data.client.email);
      this.client = data.client;
    }

  modificClient(){
    this.client.setEmail(String(this.emailFormControl.value));

    if(!this.client.verifiedDatas()) { alert("Favor De Llenar Los Datos Correctamente"); return; }

    let verific = {email:this.client.getEmail(), tel:this.client.getTel()};
    if(this.client.getEmail() === this.data.client.email) verific.email = "null";
    if(this.client.getTel() == String(this.data.client.tel)) verific.tel = "null";

    this.Express.Clients.update(this.client, verific).subscribe(re=>{
      if(re.res == "Exist") { alert("Verifica los datos, Numero Telefonico Y Email Son Unicos"); return; }
      this.Service.clients.modific(this.client);
      this.Service.sales.refreshClient(this.client);
      this.dialogRef.close('OK');
    })
  }

  salir(){
    this.dialogRef.close('');
  }
}

