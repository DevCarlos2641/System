export class Client{

  name:string = "Publico General";
  RFC :string = "Publico General";
  regimen:string = "";
  razonSocial:string = "";
  address:string = "";
  cp:number = 0;
  email:string = "";
  tel:string = "";

  public setName(name:string){ this.name = name; }
  public setRFC(rfc:string){ this.RFC = rfc; }
  public setRegimen(regimen:string){ this.regimen = regimen; }
  public setRazonSocial(razonSocial:string){ this.razonSocial = razonSocial; }
  public setAddress(address:string){ this.address = address; }
  public setCP(cp:number){ this.cp = cp; }
  public setEmail(email:string){ this.email = email; }
  public setTel(tel:string){ this.tel = tel; }

  public getRFC(){ return this.RFC; }
  public getEmail(){ return this.email }
  public getTel(){ return this.tel }

  public verifiedDatas(){

    if(this.name === "" ||  this.name === null || this.name === "null") return false;
    if(this.RFC === "" ||  this.RFC === null || this.RFC === "null") return false;
    if(this.regimen === "" ||  this.regimen === null || this.regimen === "null") return false;
    if(this.razonSocial === "" ||  this.razonSocial === null || this.razonSocial === "null") return false;
    if(this.address === "" ||  this.address === null || this.address === "null") return false;
    if(!this.verifiedCP()) return false;
    if(!this.verifiedEmail()) return false;
    if(!this.verifiedTel()) return false;


    return true;
  }

  // Se Verifica El Codigo Postal
  private verifiedCP(){
    if(this.cp > 9999)
      return true;
    return false;
  }

  // Se Verifica El Email Con Expresiones Regulares
  private verifiedEmail(){

    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(regex.test(this.email.valueOf())) return true;

    return false;
  }

  // Verifica El Numero Telefonico
  private verifiedTel(){
    if(this.tel.length < 10 || this.tel.length > 12)
      return false;
    return true;
  }

}
