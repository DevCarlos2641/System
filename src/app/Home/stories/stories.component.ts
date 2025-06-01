import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ApiFilesService } from '../../Services/api-files.service';
import { animationComponent } from '../../Animations/animation';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, MatCardModule, FormsModule,
          MatIcon
  ],
  animations:[animationComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {

  title:string = ""
  stories:Stori[] = [];
  loading = false;
  stori:Stori = new Stori();
  fileName:string = "";

  constructor(private Api:ApiFilesService){}

  ngOnInit(){
    this.Api.getFileNames().subscribe(re=>{
      for(let value of Object.values(re)){
        var story = new Stori();
        story.title = value;
        story.image = "http://localhost:3000/File/stories/"+value;
        this.stories.push(story);
      }
    })
  }

  send(){
    if(this.title == "") return;
    if(!this.stori.file) return;
    this.loading = true;
    this.stori.title = this.title;
    if (this.stori.file) {
      this.title = Date.now()+"-"+this.title+"."+(this.stori.file.type).split('/')[1];
      this.stori.title = this.title;
      const formData = new FormData();
      formData.append("image", this.stori.file, this.title);
      this.Api.uploadImage(formData).subscribe(re=>{
        this.stories.unshift(this.stori);
        this.reset();
      });
    }
  }

  reset(){
    this.loading = false;
    this.title = "";
    this.stori = new Stori();
    this.fileName = "";
  }

  onFileSelected(event:any) {
    if(event.target.files.length == 0) return
    this.stori.file = event.target.files[0];
    this.fileName = this.stori.file.name
    var reader = new FileReader();
    reader.onload = (event) =>{
      this.stori.image = event.target?.result;
    }
    reader.readAsDataURL(this.stori.file);
  }

  deleteImage(item:any){
    this.Api.deleteImage(item.title).subscribe(re=>{
      if(re != "OK") return alert("Algo salio mal, intente de nuevo");
      this.stories = this.stories.filter(title => title.title != item.title);
    });
  }
}

class Stori{
  title: string = ""
  file: File;
  image: any;
}
