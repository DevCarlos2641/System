import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Client } from "../../Objets/Client";
import { Response } from "../../Objets/Interfaces";

@Injectable({providedIn: 'root'})
export class ApiClients{
  // private url:string = "http://localhost:3000/";
  private url:string = "http://192.168.1.212:3000/";

  constructor(private http:HttpClient, private cookies:CookieService){}

  get(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.url}Client/get`, {headers: this.getHeaders()});
  }

  verific(rfc:string, email:string, tel:string): Observable<Response>{
    return this.http.get<Response>(`${this.url}Client/verific`, {params:{RFC:rfc, email, tel}, headers: this.getHeaders()});
  }

  insert(client:Client): Observable<Response>{
    return this.http.post<Response>(`${this.url}client/insert`, client , {headers: this.getHeaders()});
  }

  update(client:Client, verific:any): Observable<Response>{
    return this.http.put<Response>(`${this.url}Client/update`, [client,verific], {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders{
    const header = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.cookies.get('Token'));
    return header;
  }

}
