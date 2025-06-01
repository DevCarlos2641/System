import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SettingsService } from '../../Services/settings.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { appConfig } from '../../app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private Settings:SettingsService){}

  animation:boolean = true;

  ngOnInit(){
    this.animation = this.Settings.getAnimations();
  }

  saveSettings(){
    this.Settings.setAnimations(this.animation);
    alert("Save Setting")
  }

}
