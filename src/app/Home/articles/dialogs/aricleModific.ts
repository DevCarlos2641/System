import { Component, inject, Inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DialogBrandsView } from "../../Dialogs/Article/brandsView";
import { Article } from "../../../Objets/Article";
import { MatInputModule } from "@angular/material/input";
import { ApiService } from "../../../Services/Api.service";
import { DataService } from "../../../Services/Data.service";
import { MatIconModule } from "@angular/material/icon";
import { ApiFilesService } from "../../../Services/api-files.service";

@Component({
  selector: 'dialog-modific',
  templateUrl: './articleModific.html',
  styleUrls:['./articleModific.css'],
  providers:[],
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatCheckboxModule,
          MatChipsModule, MatInputModule, MatIconModule],
})
export class DialogModificArticle {

  article:Article = new Article();
  pieces:boolean = false;
  brand:boolean = false;
  api = inject(ApiFilesService)
  file:any;
  image = "";

  constructor(private Express:ApiService, public dialogRef: MatDialogRef<DialogModificArticle>,
    @Inject(MAT_DIALOG_DATA) public data:any, private dialog:MatDialog, private Service: DataService) {
    this.article = data.article
    const value = Service.articles.getUrlByPrimaryK(this.article.primaryK);
    if(value.length != 0)
      this.image = "http://localhost:3000/File/imageArticle/"+value
    if(this.article.getPieces() === 1) this.pieces = true;
  }

  modificArticle(){
    if(this.article.getUdm() === "mts" || this.article.getUdm() === "lts" || this.article.getUdm() === "kgs")
      this.article.setBulk(true);
    if(this.brand) this.article.setBrand("Sin Marca");
    if(!this.article.verificValues()) { alert("Favor de llenar todo los campos"); return }

    //    With Express
    this.Express.Articles.update(this.article).subscribe(re=>{
      if (re.res != "OK") return alert("Algo Salio Mal Intente De Nuevo");
      if(this.file != undefined){
        const formData = new FormData();
        const title = this.article.primaryK+"."+(this.file.type).split('/')[1]
        formData.append("image", this.file, title);
        this.api.uploadImageArticle(formData).subscribe(re=>{
          if(re != "OK") return alert("Intente subir la imagen de nuevo");
          this.Service.articles.pushImageName(this.article.primaryK);
        })
      }
      this.Service.articles.modificArticle(this.article);
      this.Service.sales.refreshArticle(this.article);
      alert("Modificacion Exitosa");
      this.dialogRef.close(this.article);
    })
  }

  changeBrand(bol:boolean){ this.brand = bol; }

  checkUdm(udm:string){
    this.article.setUdm(udm);
    if(udm === "package")
      this.pieces = false;
    else {
      this.pieces = true;
      this.article.setPieces(1);
    }
  }

  brandsView(){
    const dialog = this.dialog.open(DialogBrandsView,{data:this.data.brands});
    dialog.afterClosed().subscribe(re=>{
      if(re === undefined) return;
      this.article.setBrand(re);
    })
  }

  salir(){
    this.dialogRef.close(undefined);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      // Crear una URL para la imagen seleccionada
      this.image = URL.createObjectURL(this.file);
    }
  }

}
