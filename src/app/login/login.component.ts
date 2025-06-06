import { Login } from '../Objets/Interfaces';
import { ApiService } from '../Services/Api.service';
import { DataService } from '../Services/Data.service';
import { animationLogin } from '../Animations/animation';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  animations:[animationLogin],
  imports: [FormsModule, MatInputModule, MatIconModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {

  buttonLogin:boolean = false;

  constructor(private Service:DataService, private Api:ApiService,
            private Cookies:CookieService, private router: Router){}

  login(form:NgForm){
    this.buttonLogin = true;
    const login:Login = {
      username: form.value.userName,
      password: form.value.password
    };
    if(login.username === "" || login.password === ""){
      this.buttonLogin = false;
      return alert("Favor de llenar los datos necesarios");
    }
    this.Api.authentication(login)
      .pipe(catchError((error: HttpErrorResponse) => {
        alert("Credenciales incorrectas");
        this.buttonLogin = false;
          return throwError(() => error);
        })
      )
      .subscribe(re=>{
      this.buttonLogin = false;
      if(re.token == "Error") {
        this.Cookies.set("Token", "");
        return alert("Invalido");
      }
      this.Service.articles.findDb();
      this.Service.clients.findDb();
      this.Service.findQuotes();
      this.router.navigateByUrl('/Home')
    });
  }

}
