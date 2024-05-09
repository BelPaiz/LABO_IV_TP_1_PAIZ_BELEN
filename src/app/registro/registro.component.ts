import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../services/authen.service';


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

  constructor(private auth:AuthenService){}

  registro(){
    this.auth.Registro(this.email, this.clave, this.usuarioInicio);
    console.log(this.usuarioInicio);
  }

}
