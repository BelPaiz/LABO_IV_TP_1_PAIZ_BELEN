import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from '../registro/registro.component';
import { Usuario } from '../models/usuario.models';
import { FirestoreService } from '../services/firestore.service';
import { AuthenService } from '../services/authen.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string = "";
  clave:string = "";
  logsCol:any[] = [];
  counts:number = 0;
  usuarioLogueado:string = "";
  error:string = "";
  usuarioDefecto: string = "belen@mail.com";
  passDefecto: string = "123456";

  constructor(private firestore:FirestoreService,
    private auth:AuthenService,
    private router:Router
  ){}

  login(){
    this.auth.Login(this.email, this.clave)
    .then((res) => {
      if(res.user.email != null) this.usuarioLogueado = res.user.email;
      this.firestore.loginRegister(this.usuarioLogueado);
      this.router.navigate(['/home']);
    }).catch((e) => {if(e = 'auth/invalid-credential'){
      this.error = "Usuario y/o contraseña invalido"
      console.log(this.error)
    }});
  }
  getData(){
    this.firestore.getData(this.counts, this.logsCol);
  }
  rellenarUsuario(){
    this.email = this.usuarioDefecto;
    this.clave = this.passDefecto;
  }
  }

