import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from '../registro/registro.component';
import { Usuario } from '../models/usuario.models';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:string = "";
  logsCol:any[] = [];
  counts:number = 0;

  constructor(private firestore:FirestoreService){}

  login(){
    this.firestore.loginRegister(this.user);
  }
  getData(){
    this.firestore.getData(this.counts, this.logsCol);
  }



  }
  
  // verifica(user: Usuario){
  //   if(this.nombre == user.nombre && this.pass == user.pass){
  //     this.login_aceptado = true;
  //   }
  // }
  // ingreso(){
  //   let user = new Usuario(this.nombreIngresado, this.passIngresado);
  //   this.verifica(user);
  //   this.clickEnviar = true;
  //   this.mostrarForm = false;
  // }

