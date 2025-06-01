import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ConsultSale, ProductBySale, Response } from "../../Objets/Interfaces";
import { Sale } from "../../Objets/Sale";

@Injectable({providedIn: 'root'})
export class ApiSales{

  // private url:string = "http://localhost:3000/";
  private url:string = "http://192.168.1.212:3000/";

  constructor(private http:HttpClient, private cookies:CookieService){}

  get(): Observable<ConsultSale[]>{
    return this.http.get<ConsultSale[]>(`${this.url}Sale/get`, {headers: this.getHeaders()});
  }

  getProducts(idSale: number): Observable<ProductBySale[]>{
    return this.http.get<ProductBySale[]>(`${this.url}Sale/products`, {params:{idSale}, headers: this.getHeaders()})
  }

  insert(sale:Sale): Observable<Response>{
    return this.http.post<Response>(`${this.url}Sale/insertSale`, sale, {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders{
    const header = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.cookies.get('Token'));
    return header;
  }

}
