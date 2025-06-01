
import { Component, ViewChild } from '@angular/core';
import { Article } from '../../Objets/Article';
import { NgForm } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatDialog} from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule} from '@angular/material/chips';
import { FormsModule} from '@angular/forms';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { DialogBrandsView } from '../Dialogs/Article/brandsView';
import { DialogModificArticle } from './dialogs/aricleModific';
import { DialogModificArticleKey } from './dialogs/articleModificKey';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../Services/Api.service';
import { animationComponent } from '../../Animations/animation';
import { DataService } from '../../Services/Data.service';
import { NewMerchComponent } from "./new-merch/new-merch.component";

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.css',
    standalone: true,
    providers: [],
    animations: [animationComponent],
    imports: [MatTabsModule, MatFormFieldModule, MatInputModule, MatChipsModule,
        FormsModule, MatCheckboxModule, MatIconModule, MatButtonModule,
        MatTableModule, MatPaginatorModule, NewMerchComponent]
})

export class ArticlesComponent {

  @ViewChild('tab3') newMerch: NewMerchComponent;

  secondary:boolean = false;
  pieces:boolean = true;
  brand:boolean = false;

  dialogBrand:String = "";
  udm:string = "pieces";
  input:string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource:any;
  columnas: string[] = ['key', 'name', 'stock', 'udm', 'price'];

  constructor(private Service:DataService,
              private dialog:MatDialog, private Express:ApiService){}

  ngOnInit(){
    this.findArticles();
  }

  change(bol:boolean){
    this.secondary = bol;
  }

  changeBrand(bol:boolean){
    this.brand = bol;
  }

  addArticle(form:NgForm){
    let article:Article = new Article();
    article.setPrimary(String(form.value.primaryK));
    article.setSecondary(String(form.value.secondary));
    article.setName(String(form.value.name));
    article.setStock(form.value.stock);
    article.setPrice(form.value.price);
    article.setBrand(String(form.value.brand));
    article.setPieces(form.value.pieces);
    article.setUdm(this.udm);

    if(this.udm === "mts" || this.udm === "lts" || this.udm === "kgs")
      article.setBulk(true);
    if(this.pieces === true) article.setPieces(1);
    if(this.secondary === true) article.setSecondary("null");
    if(this.brand === true ) article.setBrand("Sin Marca");

    if(!article.verificValues()) { alert("Favor de llenar todo los campos"); return }

    //    With Express
    const keys = {primary:article.getPrimary(), secondary:article.getSecondary()};
    this.Express.Articles.verific(keys).subscribe(re=>{
      if(re.res == "Exist") return alert("Articulo Existente Con Clave");
      this.Express.Articles.insert(article).subscribe(re=>{
        if(re.res != "OK") return alert("Algo Salio Mal Intente De Nuevo");
        this.Service.articles.pushArticle(article);
        form.resetForm();
        alert("Alta Correcta");
      })
    })
  }

  checkUdm(udm:string){
    this.udm = udm;
    if(udm === "package") this.pieces = false;
    else this.pieces = true;
  }

  brandsView(){
    const dialog = this.dialog.open(DialogBrandsView,{data:this.Service.articles.getBrands()});
    dialog.afterClosed().subscribe(re=>{
      if(re === undefined) return;
      this.dialogBrand = re;
    })
  }

  // Tab Table Articles

  async findArticles(){
    await new Promise(f => setTimeout(f, 100));
    this.dataSource = new MatTableDataSource(this.Service.articles.get());
    this.dataSource.paginator = this.paginator;
  }

  filtrar() {
    this.dataSource.filter = this.input.trim().toLowerCase();
  }

  modificArticle(primaryK:string){
    const dialog = this.dialog.open(DialogModificArticle, {data:{article:this.Service.articles.getByPrimaryK(primaryK),
        brands:this.Service.articles.getBrands()}});
    dialog.afterClosed().subscribe(re=>{
      if(re == undefined) return
      this.findArticles();
      this.newMerch.updateNewMerch(re);
    });
  }

  modificArticleKey(primaryK:string){
    const dialog =this.dialog.open(DialogModificArticleKey,
      {data:{article:this.Service.articles.getByPrimaryK(primaryK), brands:this.Service.articles.getBrands()}});
    dialog.afterClosed().subscribe(re=>{
      if(re == "OK")
        this.findArticles();
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    if(Number(event.index) == 2)
      setTimeout(()=>{this.newMerch.focusInput();}, 500)
  }

}
