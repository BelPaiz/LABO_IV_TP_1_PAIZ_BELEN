import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit{

  constructor(private firestore: FirestoreService,
    private router: Router,
    public loader: LoaderService,
    private auth:AuthenService){}


    nombre: string = "";
    apellido: string = "";
    edad!: number;
    telefono!: number;
    nivelSatisfaccion: string = "Es excelente";
    valorSatisfecho: number = 10;
    error:string = "";
    opcion_seleccionada: string = "";
    comentario:string = "";
    usuario:string = "";

    okNombre:boolean = false;
    okApell:boolean = false;
    okEdad:boolean = false;
    okTel:boolean = false;
    okOpc:boolean = false;
    okComen:boolean = false;

    todoOk:boolean = false;

  ngOnInit(){
    this.setSatisfecho();
    this.auth.DatosAutenticacion().subscribe({
      next: (email) => {
        if(email){
          this.usuario = email;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  setSatisfecho(){
    if (this.valorSatisfecho === 1) {
      this.nivelSatisfaccion = 'No me gusto';
    } else if (this.valorSatisfecho < 5) {
      this.nivelSatisfaccion = 'Gusto poco';
    } else if (this.valorSatisfecho === 5) {
      this.nivelSatisfaccion = 'Un poco me gusto';
    } else if (this.valorSatisfecho < 10) {
      this.nivelSatisfaccion = 'Me gusto bastante';
    } else if (this.valorSatisfecho === 10) {
      this.nivelSatisfaccion = 'Es excelente';
    }
  }
  VerificarCampos(){
    if(this.nombre !== ""  && this.nombre.length > 1 && !/\d/.test(this.nombre)){
      this.okNombre = true;
    }
    if(this.apellido !== ""  && this.apellido.length > 1 && !/\d/.test(this.apellido)){
      this.okApell = true;
    }
    if(this.edad > 17 && this.edad < 100){
      this.okEdad = true;
    }
    if(this.telefono > 1000000000 && this.telefono < 9999999999){
      this.okTel = true;
    }
    if(this.opcion_seleccionada!== ""){
      this.okOpc = true;
    }
    if(this.comentario !== ""  && this.comentario.length > 1){
      this.okComen = true;
    }
    if(this.okComen && this.okOpc && this.okTel && this.okEdad && this.okApell && this.okNombre){
      this.todoOk = true;
    }

  }
  enviar(){
    this.VerificarCampos();
    if(this.todoOk){
      const encuesta = {
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad,
        telefono: this.telefono,
        satisfaccion: this.nivelSatisfaccion,
        recomedar: this.opcion_seleccionada,
        comentario: this.comentario
      }
      this.firestore.setEncuesta(encuesta);
      this.limpiarCampos();

    }
    else{
      this.error = "Verifique la correcta integracion de los campos";
    }
  }
  seleccionRecom(opcion: number){
    switch(opcion){
      case 1:
        this.opcion_seleccionada = "Si la recomendaría";
        break;
        case 2:
          this.opcion_seleccionada = "No la recomendaría";
        break;
    }
    this.error = "";
  } 
  limpiarError(){
    this.error = "";
  }
  limpiarCampos(){
    this.nombre = "";
    this.apellido = "";
    this.edad = 0;
    this.telefono = 0;
    this.nivelSatisfaccion = "Es excelente";
    this.opcion_seleccionada= "";
    this.comentario = "";
    this.error = "Gracias por completar la encuesta";
    setTimeout(()=> {this.salir()}, 500);
  }
  salir(){
    this.router.navigate(['/home']);
  }

}
