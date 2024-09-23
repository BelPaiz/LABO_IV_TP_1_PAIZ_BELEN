import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../services/authen.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  email:string = "";
  clave:string = "";
  usuarioInicio:string = "";
  usuarioLogueado:string = "";
  error:string = "";
  infom:string = "";
  infop:string = "";
  ocultarm:boolean = true;
  ocultarp:boolean = true;

  constructor(private auth:AuthenService,
    private router:Router){}

  registro(){
    this.ocultarm = true;
    this.ocultarp = true;
    if(this.email === '' || this.clave === ''){
      this.error = "Ingrese email y contraseña";
    }
    else{
      this.auth.Registro(this.email, this.clave)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/home']);
      }).catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            this.error = "Email incorrecto";
            break;
          case 'auth/email-already-in-use':
            this.error = "El email ya se encuentra registrado";
            break;
          case 'auth/weak-password':
            this.error = "Al menos 6 caracteres";
            break;
          default:
            this.error = "Ocurrió un error inesperado";
            break;
        
      }});
    }
    
  }
  infoEmail(){
    this.ocultarp = true;
    this.error = "";
    this.infom = "example@mail.com";
    this.ocultarm = !this.ocultarm;
  }
  infoPass(){
    this.ocultarm = true;
    this.error = "";
    this.infop = "<ul><li>mínimo 6 caracteres</li><li>pueden utilizarse números, letras y/o caracteres especiales</li></ul>";
    this.ocultarp = !this.ocultarp;
  }
  
    



}
