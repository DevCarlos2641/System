
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiFilesService{

  private url:string = "http://localhost:3000/";

  constructor(private http: HttpClient){}

  uploadImage(file: FormData){
    return this.http.post(`${this.url}File/Upload/stories`, file);
  }

  deleteImage(fileName:string){
    return this.http.delete(`${this.url}File/stories/Del`, {body: {fileName}});
  }

  getFileNames(){
    return this.http.get(`${this.url}File/stories/fileName/get`);
  }

  uploadImageArticle(file:FormData){
    return this.http.post(`${this.url}File/Upload/imageArticle`, file);
  }

  getFileNamesImageArticles(){
    return this.http.get<string[]>(`${this.url}File/imageArticle/fileName/get`);
  }

}
