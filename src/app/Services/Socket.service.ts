import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Quote } from '../Objets/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{

  callBack: EventEmitter<Quote> = new EventEmitter();

    constructor(private cookies:CookieService) {
    super({
      url: 'http://localhost:3000',
      options:{
        query:{
          name: cookies.get("Enterprise")
        }
      }
    });
    this.ioSocket.on('AddQuote', (res:Quote)=>this.callBack.emit(res));
  }

  emitClientQuote(rfc:string, idQuote:number){
    this.ioSocket.emit("QuoteFinish", [this.cookies.get("Enterprise")+"-"+rfc,`Finish,${idQuote}`]);
  }

}
