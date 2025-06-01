import { Client } from "./Client"

export interface Response{
  type:string,
  res:string
}

export interface interfaceSale{
  idSale:number,
  idUser:number,
  methodPay:string,
  RFC:string,
  products:Products[],
  total:number,
  date:string,
}

export interface Products{
  primaryK: string,
  pieces: number,
  price: number
}

export interface ConsultSale extends interfaceSale{
  name:string
}

export interface ProductBySale{
  idSale: number,
  primaryK: string,
  secondary: string,
  piecesSold: number,
  price: number,
  name: string,
  udm: string,
  brand: string,
  pieces: number
}

export interface Login{
  username: string,
  password: string
}

export interface Enterprise{
  enterprise: string,
  token: string
}

export interface Quote{
  name: any
  RFC: string,
  idQuote: number,
  status: string,
  date: string,
  products: [],
  enterprise: string
}

export interface ProductByQuote{
  idQuote: number,
  pieces: number,
  primaryK: string
}


export interface NewMerch{
  primaryK: string,
  name: string,
  udm: string,
  stock: number,
  input: number,
  finish: number
}
