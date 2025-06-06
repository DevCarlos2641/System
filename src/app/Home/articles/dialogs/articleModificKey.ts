import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from "../../../Services/Api.service";
import { DataService } from "../../../Services/Data.service";

@Component({
  selector: 'dialog-modificKey',
  templateUrl: './articleModificKey.html',
  styleUrls:['./articleModificKey.css'],
  providers:[],
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatCheckboxModule,
           MatInputModule],
})
export class DialogModificArticleKey {

  keys:any = {};

  secondary:boolean = false;

  constructor(private Service:DataService, public dialogRef: MatDialogRef<DialogModificArticleKey>,
    @Inject(MAT_DIALOG_DATA) public data:any, private Express:ApiService) {

    this.keys = {
      primaryK: String(data.article.primaryK),
      secondary: String(data.article.secondary)
    }
    if(this.keys.secondary === "null"){
      this.keys.secondary = "";
      this.secondary = true;
    }
  }

  modificArticleKey(form:NgForm){
    const newKeys:any = {
      primaryK: form.value.primaryK,
      secondary: form.value.secondary
    };

    if(this.secondary || newKeys.secondary == "")
      newKeys.secondary = "null";
    if(newKeys.primaryK == "")
      return alert("Llaves Vacias");

    if(newKeys.primary == "")
      return alert("Llave Primaria Obligatoria");
    if(newKeys.primaryK == newKeys.secondary)
      return alert("Las llaves no deben ser las mismas");

    let data = {
      primaryK: this.keys.primaryK,
      secondary: this.keys.secondary,
      newPrimaryK: newKeys.primaryK,
      newSecondary: newKeys.secondary
    };

    if(data.primaryK === data.newPrimaryK && data.secondary === data.newSecondary)
      return alert("No Hay Modificacion En Llaves");

    //    With Express
    this.Express.Articles.updateKeys(data).subscribe(re=>{
      if(re.res != "OK") return alert("Clave Existente");
      // this.Service.articles.modificArticle()
      this.salir("OK");
    })
  }

  change(bol:boolean): void{
    this.secondary = bol;
  }

  salir(message:string): void{
    this.dialogRef.close(message);
  }
}
