import { Injectable } from "@angular/core";
import { ApiService } from "../Api.service";
import { Article } from "../../Objets/Article";
import { NewMerch } from "../../Objets/Interfaces";
import { ApiFilesService } from "../api-files.service";

@Injectable({providedIn: 'root'})
export class ArticlesData{

  private articles:Article[] = [];
  private newMerch: NewMerch[] = [];
  private imagesNames: string[] = [];

  constructor(private Express:ApiService, private ApiFile:ApiFilesService){}

  findDb(){
    this.Express.Articles.get().subscribe(re=>{
      console.log(re)
      // this.articles = re;
    });
    this.ApiFile.getFileNamesImageArticles().subscribe(re=>{
      this.imagesNames = re;
    })
  }

  get(){
    return this.articles;
  }

  getBrands(){
    let brands:string[] = [];
    for(let i in this.articles){
      if(!brands.includes(this.articles[i].brand))
        brands.push(this.articles[i].brand);
    }
    return brands.sort();
  }

  getByPrimaryK(primaryK: string){
    const art = this.articles.filter(key => key.primaryK == primaryK)[0];
    const article = new Article();
    article.primaryK = art.primaryK;
    article.secondary = art.secondary;
    article.name = art.name;
    article.stock = art.stock;
    article.udm = art.udm;
    article.price = art.price;
    article.pieces = art.pieces;
    article.brand = art.brand;
    article.bulk = art.bulk;
    return article;
  }

  getBy(key:string){
    key = key.toLowerCase()
    const art = this.articles.filter(v => v.primaryK.toLowerCase() == key
      || v.secondary.toLowerCase() == key)[0];
    const article = new Article();
    if(art == undefined) return article;
    article.primaryK = art.primaryK;
    article.secondary = art.secondary;
    article.name = art.name;
    article.stock = art.stock;
    article.udm = art.udm;
    article.price = art.price;
    article.pieces = art.pieces;
    article.brand = art.brand;
    article.bulk = art.bulk;
    return article;
  }

  pushArticle(article:Article){
    this.articles.push(article);
  }

  modificArticle(article:Article){
    this.articles = this.articles.map(v=>{
      if(v.primaryK == article.primaryK)
        return article;
      return v;
    })
  }

  modificStcok(primaryK:String, pieces:number){
    this.articles.map(v=>{
      if(v.primaryK == primaryK){
        v.stock -= pieces;
        this.updateNewMerch(v);
      }
    })
  }

  getNewMerch():NewMerch[]{
    return this.newMerch;
  }
  setNewMerch(merch: NewMerch[]){
    this.newMerch = merch;
  }
  updateNewMerch(article:Article){
    this.newMerch = this.newMerch.map(v=>{
      if(v.primaryK == article.primaryK)
        return this.parseNewMerch(v, article);
      return v;
    })
  }
  parseNewMerch(v:NewMerch, art:Article):NewMerch{
    const value: NewMerch = {
      primaryK: v.primaryK,
      name: art.name,
      udm: art.udm,
      stock: art.stock,
      input: v.input,
      finish: Number(art.stock) + Number(v.input)
    }
    return value;
  }

  // methos for imageUrl

  getUrlByPrimaryK(primaryK: string){
    return this.imagesNames.filter(v=> v.split(".")[0] == primaryK)
  }

  verifiedImageName(primaryK: string): boolean{
    const value = this.getUrlByPrimaryK(primaryK);
    if(value.length != 0) return true;
    else return false
  }

  pushImageName(primaryK: string){
    if(this.verifiedImageName(primaryK))
      this.imagesNames = this.imagesNames.filter(v=>v.split(".")[0] != primaryK);

    this.imagesNames.push(primaryK+".png");
  }

}
