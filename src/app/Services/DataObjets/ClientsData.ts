import { Injectable } from "@angular/core";
import { Client } from "../../Objets/Client";
import { ApiService } from "../Api.service";

@Injectable({providedIn: 'root'})
export class ClientData{

  private clients: Client[] = [];

  constructor(private Api:ApiService){}

  findDb(){
    this.Api.Clients.get().subscribe(re=>{
      this.clients = re;
    });
  }

  get(){ return this.clients; }

  getByRfc(rfc: string) : Client{
    const cl = this.clients.filter( key => key.RFC == rfc)[0];
    const client = new Client();
    client.name = cl.name;
    client.RFC = cl.RFC;
    client.regimen = cl.regimen;
    client.razonSocial = cl.razonSocial;
    client.address = cl.address;
    client.cp = cl.cp;
    client.email = cl.email;
    client.tel = cl.tel;
    return client;
  }

  push(client:Client){ this.clients.push(client); }

  modific(client: Client){
    this.clients = this.clients.map(v=>{
      if(v.RFC == client.RFC) return client;
      else return v;
    });
  }

}
