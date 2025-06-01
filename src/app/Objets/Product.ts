export class Product{
  primaryK:String;
  name:String;
  udm:String;
  price:number;
  piecesSold:number;
  brand:number;
  total:number;

  public addPieceSold(){
    this.piecesSold++;
    this.total = this.piecesSold * this.price
  }

  public modificPieces(piecesSold:number){
    this.piecesSold = piecesSold;
    this.total = this.price * this.piecesSold;
  }
}
