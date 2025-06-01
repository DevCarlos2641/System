import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private animations:boolean = true;

  public getAnimations(){
    return this.animations;
  }

  public setAnimations(animation:boolean){
    this.animations = animation;
  }
}
