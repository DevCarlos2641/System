import { AfterViewInit, Component, ElementRef, EventEmitter, inject, input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SearchArticle } from '../../Dialogs/Article/searchArticle';
import { DataService } from '../../../Services/Data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../../Objets/Article';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NewMerch } from '../../../Objets/Interfaces';
import { ArticlesComponent } from '../articles.component';
import { ApiService } from '../../../Services/Api.service';

@Component({
  selector: 'app-new-merch',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatIconModule, MatButtonModule, MatPaginator, MatTableModule],
  templateUrl: './new-merch.component.html',
  styleUrl: './new-merch.component.css'
})
export class NewMerchComponent {

  @ViewChild('inputF') inputFocus: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() eventNewMerch = new EventEmitter<void>();
  columnas: string[] = ['delete', 'description', 'stock', 'input', 'finish'];

  input:string = "";
  dialog = inject(MatDialog);
  service = inject(DataService)
  serviceApi = inject(ApiService);
  articles:NewMerch[] = [];
  dataSource = new MatTableDataSource<NewMerch>(this.articles);

  protected ngOnInit(){
    this.articles = this.service.articles.getNewMerch();
    this.refreshTable();
  }

  protected refreshTable(){
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.paginator = this.paginator;
  }

  focusInput(){
    this.inputFocus.nativeElement.focus()
  }

  protected async findArticle(){
    if(this.input == "null") return

    const art = this.service.articles.getBy(this.input);
    if(art.primaryK != "")
      return this.dialogInputMerch(this.getFormat(art));

    const dialogOpen = this.dialog.open(SearchArticle, {data:{articles:this.service.articles.get(), input: this.input}});
    dialogOpen.afterClosed().subscribe(re=>{
      if(re == undefined) return;
      this.dialogInputMerch(this.getFormat(re[0]))
    })
  }

  async dialogInputMerch(art:NewMerch){
    const index = this.dataSource.data.findIndex((v=>v.primaryK == art.primaryK))
      if(index != -1) return this.showFocus(index);
    const dialogOpen2 = this.dialog.open(DialogInputStock);
    dialogOpen2.afterClosed().subscribe(re=>{
      if(re == undefined || re == "") re = 0;
      art.input = re;
      this.articles.unshift(art);
      this.paginator.pageIndex = 0;
      this.paginator._changePageSize(this.paginator.pageSize);
      this.showFocus(0);
      this.refreshTable();
      this.focusInput();
    })
  }

  getFormat(art:Article){
    let merch:NewMerch = {
      primaryK: art.primaryK,
      name: art.name,
      udm: art.udm,
      stock: art.stock,
      input: 0,
      finish: 0
    }
    return merch
  }

  async showFocus(index:number){
      const pageSize = this.paginator.pageSize;
      const pageIndex = Math.floor(index / pageSize);
      this.paginator.pageIndex = pageIndex;
      this.paginator._changePageSize(pageSize);

      await this.waitFor(100);

      let element = document.getElementsByClassName("product")[index - (pageIndex * pageSize)];
      element.setAttribute("style", "background-color: rgb(17, 133, 228); transition: background-color 0.5s ease;");
      setTimeout(()=>{ element.setAttribute("style", "transition: background-color 0.5s ease;"); }, 500);
  }

  waitFor(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  protected suma(n1:number, n2:number){
    return Number(n1)+Number(n2);
  }

  protected finish(){
    this.articles.map(v=>{
      let art = this.service.articles.getByPrimaryK(v.primaryK);
      art.stock = Number(v.stock)+Number(v.input);
      this.service.articles.modificArticle(art);
    })

    // this is for server update DB
    this.articles.map(v=>{
      v.finish = Number(v.stock)+Number(v.input);
    })
    this.serviceApi.Articles.newMerch(this.articles).subscribe(re=>{
      if(re.res != "OK") return alert("Error intente de nuevo");
      this.eventNewMerch.emit();
      alert("Mercancia actualizada");
      this.articles = [];
      this.refreshTable();
      this.focusInput();
    });
  }

  ngOnDestroy(){
    this.service.articles.setNewMerch(this.articles);
  }

  updateNewMerch(art:Article){
    this.service.articles.updateNewMerch(art)
    this.articles = this.service.articles.getNewMerch();
    this.refreshTable();
  }

  delete(primaryK:String){
    this.articles = this.articles.filter(v=> v.primaryK != primaryK);
    this.refreshTable();
    this.focusInput();
  }

}

@Component({
  standalone: true,
  imports:[MatInputModule, MatButtonModule],
  template:`
  <div class="body">
    <mat-form-field appearance="outline">
      <mat-label>Entrada de mercancia</mat-label>
      <input matInput placeholder="Entrada" #input name="input" type="number" (keydown.enter)="sendInput(input.value)" autocomplete="off">
    </mat-form-field>
    <button mat-flat-button type="button" (click)="sendInput(input.value)">Listo</button>
  </div>
  `,
  styles:`
  .body{
    padding: 20px;
  }
  `
})
class DialogInputStock{

  readonly dialogRef = inject(MatDialogRef<DialogInputStock>);

  sendInput(input: string){
    this.dialogRef.close(input);
  }

}
