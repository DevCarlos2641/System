import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ProductByQuote, Quote } from "../../Objets/Interfaces";

@Injectable({providedIn: 'root'})
export class ApiQuotes{

  // private url:string = "http://localhost:3000/";
  private url:string = "http://192.168.1.212:3000/";

  constructor(private http:HttpClient, private cookies:CookieService){}

  get(): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${this.url}Quote/get`, {headers: this.getHeaders()})
  }

  getProducts(idQuote: Number): Observable<ProductByQuote[]>{
    return this.http.get<ProductByQuote[]>(`${this.url}Quote/products`, {params:{idQuote: `${idQuote}`}, headers: this.getHeaders()})
  }

  update(quote:Quote){
    return this.http.put(`${this.url}Quote/update`, quote, {headers:this.getHeaders()})
  }

  getHeaders(): HttpHeaders{
    const header = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.cookies.get('Token'));
    return header;
  }

}
