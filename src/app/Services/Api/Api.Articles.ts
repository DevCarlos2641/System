import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../../Objets/Article";
import { CookieService } from "ngx-cookie-service";
import { NewMerch, Response } from "../../Objets/Interfaces";

@Injectable({ providedIn: 'root' })
// export class ApiArticles{

//   // private url:string = "http://localhost:3000/";
//   private url:string = "http://192.168.1.212:3000/";

//   constructor(private http:HttpClient, private cookies:CookieService){}

//   get(): Observable<Article[]>{
//     return this.http.get<Article[]>(`${this.url}Article/get`, {headers: this.getHeaders()});
//   }

//   verific(keys:any): Observable<Response>{
//     return this.http.get<Response>(`${this.url}Article/verific`, {params:keys, headers: this.getHeaders()});
//   }

//   insert(article:Article): Observable<Response>{
//     return this.http.post<Response>(`${this.url}Article/insert`, article, {headers: this.getHeaders()});
//   }

//   update(article:Article): Observable<Response>{
//     return this.http.put<Response>(`${this.url}Article/update`, article, {headers: this.getHeaders()});
//   }

//   updateKeys(data:any):Observable<Response>{
//     return this.http.put<Response>(`${this.url}Article/updateKeys`, data, {headers: this.getHeaders()});
//   }

//   newMerch(merch: NewMerch[]): Observable<Response>{
//     return this.http.put<Response>(`${this.url}Article/newMerch`, merch, {headers: this.getHeaders()});
//   }

//   getHeaders(): HttpHeaders{
//     const header = new HttpHeaders()
//     .set('Authorization', 'Bearer '+this.cookies.get('Token'));
//     return header;
//   }
// }


export class ApiArticles{

  private url:string = "http://localhost:8080/system/api/v1";

  constructor(private http:HttpClient, private cookies:CookieService){}

  get(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.url}/article/all`);
  }

  verific(keys:any): Observable<Response>{
    return this.http.get<Response>(`${this.url}Article/verific`, {params:keys, headers: this.getHeaders()});
  }

  insert(article:Article): Observable<Response>{
    return this.http.post<Response>(`${this.url}Article/insert`, article, {headers: this.getHeaders()});
  }

  update(article:Article): Observable<Response>{
    return this.http.put<Response>(`${this.url}Article/update`, article, {headers: this.getHeaders()});
  }

  updateKeys(data:any):Observable<Response>{
    return this.http.put<Response>(`${this.url}Article/updateKeys`, data, {headers: this.getHeaders()});
  }

  newMerch(merch: NewMerch[]): Observable<Response>{
    return this.http.put<Response>(`${this.url}Article/newMerch`, merch, {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders{
    const header = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.cookies.get('Token'));
    console.log(header);
    return header;
  }
}