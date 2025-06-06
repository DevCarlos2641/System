import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ApiService } from '../Services/Api.service';
import { MatButtonModule } from '@angular/material/button';
import { SocketService } from '../Services/Socket.service';
import { animationNotify } from '../Animations/animation';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogShowQuote } from './quotes/Dialogs/showQuote';
import { Quote } from '../Objets/Interfaces';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatMenuModule,
          MatListModule, RouterLink, MatBadgeModule, MatButtonModule, MatIconModule, MatChipsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [animationNotify]
})
export class HomeComponent {

  badgeN:number = 0;
  badge:boolean = true;
  enterprise:string = "";

  showNotify:boolean[] = [];
  notify:number[] = [];
  quote$:Quote[] = [];
  top:number = 100;
  count:number = 0;

  // private Socket:SocketService
  constructor(private Api:ApiService, private Dialog:MatDialog, private router:Router){
    console.log('HomeComponent cargado');
  }

  ngOnInit(){
    // this.Api.Quotes.get().subscribe(re=>{
    //   re = re.filter(v=>v.status != "Entregado");
    //   this.badgeN = re.length;
    //   if(this.badgeN > 0) this.badge = false;
    // })
    // this.Socket.callBack.subscribe(re=>{
    //   this.notify.unshift(this.notify.length+1);
    //   this.showNotify.unshift(true);
    //   this.quote$.unshift(re)
    //   this.count++;
    //   this.badgeN++;
    //   this.badge = false;
    //   setTimeout( ()=>{
    //     this.showNotify[this.notify.length-1] = false
    //     this.notify.pop();
    //     this.showNotify.pop();
    //     this.count--
    //     if(this.count >= 1) this.top -= 100;
    //     if(this.count == 0) this.top = 100;
    //   }, 10000);
    //   const element = document.getElementsByClassName("notify");
    //   if(element[this.count-2] != undefined){
    //     this.top+=100;
    //     element[this.count-2].setAttribute("style", `top: ${this.top}px`);
    //   }
    // })
  }

  showQuotes(index:number){
    let quote = this.quote$[index];
    const dialog = this.Dialog.open(dialogShowQuote, {data:{quote}})
    dialog.afterClosed().subscribe(re=>{
      if(re == "Surtiendo")
        alert("La cotización se mando a ventas en espera")
    })
  }

  logout(){
    const dialog = this.Dialog.open(DialogLogout);
    dialog.afterClosed().subscribe(value=>{
      if(value){
        this.Api.logout().subscribe(res=>{
          this.router.navigate(['/']);
        });
      }
    })
  }
}

@Component({
  selector: 'dialog-logout',
  template: `
    <div style="padding 20px; width: 300px; height: 100px;">
        <p style="text-align: center;">¿Desea cerrar sesión?</p>
        <div style="display: flex; justify-content: space-evenly;">
          <button matButton="filled" (click)="close(false)">Cancelar</button>
          <button matButton="outlined" (click)="close(true)">Aceptar</button>
        </div>
    </div>
  `,
  styles: ``,
  standalone: true,
  imports: [MatButtonModule]
})
class DialogLogout{

  constructor(private dialogRef: MatDialogRef<DialogLogout>){}

  close(value:boolean){
    this.dialogRef.close(value);
  }

}