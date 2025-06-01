import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Client } from '../Objets/Client';
import { Article } from '../Objets/Article';
import { ConsultSale, Enterprise, Login, ProductBySale, Quote, Response, interfaceSale } from '../Objets/Interfaces';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiArticles } from './Api/Api.Articles';
import { ApiClients } from './Api/Api.Clients';
import { ApiSales } from './Api/Api.Sales';
import { ApiQuotes } from './Api/Api.Quotes';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  // private url:string = "http://localhost:3000/";
  private url:string = "http://localhost:8080/system/api/v1";
  Articles = inject(ApiArticles);
  Clients = inject(ApiClients);
  Sales = inject(ApiSales);
  Quotes = inject(ApiQuotes);

  constructor(private http:HttpClient, private cookies:CookieService) {}

  authentication(login:Login){
    return this.http.post<Enterprise>(`${this.url}/auth`, login);
  }
}
