export class Article{

  primaryK:string = "";
  secondary:string = "";
  name:string = "";
  stock:number = 0;
  udm:string = "";
  price:number = 0;
  pieces:number = 0;
  brand:string = "";
  bulk:boolean = false;

  verificValues():boolean{
    if(this.primaryK === "" || this.primaryK === null) return false;
    if(this.secondary === "" || this.secondary === null) return false;
    if(this.name === "" || this.name === null) return false;
    if(this.udm === "" || this.udm === null) return false;
    if(this.brand === "" || this.brand === null) return false;
    if(isNaN(this.stock)) return false;
    if(isNaN(this.price)) return false;
    if(isNaN(this.pieces) || this.pieces === 0) return false;

    return true;
  }

  setPrimary(primaryK:string){ this.primaryK = primaryK.trim(); }
  setSecondary(secondary:string){ this.secondary = secondary.trim(); }
  setName(name:string){ this.name = name.trim(); }
  setStock(stock:number){ this.stock = stock; }
  setUdm(udm:string){ this.udm = udm.trim(); }
  setPrice(price:number){ this.price = price }
  setPieces(pieces:number){ this.pieces = pieces }
  setBrand(brand:string){ this.brand = brand.trim(); }
  setBulk(bulk:boolean){ this.bulk = bulk }

  getPrimary(){ return this.primaryK }
  getSecondary(){ return this.secondary }
  getName(){ return this.name }
  getStock(){ return this.stock }
  getUdm(){ return this.udm }
  getPrice(){ return this.price }
  getPieces(){ return this.pieces }
  getBrand(){ return this.brand }
  getBulk(){ return this.bulk }

}
