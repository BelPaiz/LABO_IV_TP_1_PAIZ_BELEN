import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit{

  constructor(private firestore: FirestoreService,
    private router: Router,
    public loader: LoaderService,
    private auth:AuthenService){}

    usuario!:string;
    nivelSatisfaccion: string = 'Es excelente';
    error!:string;
    form!:FormGroup;
    todoOk:boolean = false;
    valorSatisfecho!: number;

  ngOnInit(){
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
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl('18', [Validators.required, Validators.min(18), Validators.max(99)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      satisfaccion: new FormControl(10, [Validators.required, Validators.min(1), Validators.max(10)]),
      recomendar: new FormControl('',[ Validators.required]),
      comentario: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)])
    });
    
  }

  setSatisfecho() {
    this.valorSatisfecho = this.satisfaccion;
    if (this.valorSatisfecho === 0) {
      this.nivelSatisfaccion = 'No me gusto';
    } else if (this.valorSatisfecho < 5) {
      this.nivelSatisfaccion = 'Me gusto un poco';
    } else if (this.valorSatisfecho === 6) {
      this.nivelSatisfaccion = 'me gusto';
    } else if (this.valorSatisfecho < 10) {
      this.nivelSatisfaccion = 'Me gusto bastante';
    } else if (this.valorSatisfecho === 10) {
      this.nivelSatisfaccion = 'Es excelente';
    }
  }

  enviar(){
    console.log(this.form.value);
    console.log(this.form);
    
    if (this.form.valid) {
      const encuesta = {
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad,
        telefono: this.telefono,
        satisfaccion: this.nivelSatisfaccion,
        comentario: this.comentario,
        recomedar: this.recomnendar,
        

      };
      console.log(encuesta);
      this.firestore.setEncuesta(encuesta);
      this.limpiarCampos();
    } else {
      this.error = "Verifique la correcta integración de los campos";
      console.log(this.form.get('nombre')?.errors);
      console.log(this.form.get('apellido')?.errors);
      console.log(this.form.get('edad')?.errors);
      console.log(this.form.get('telefono')?.errors);
      console.log(this.form.get('satisfaccion')?.errors);
      console.log(this.form.get('recomendar')?.errors);
      console.log(this.form.get('comentario')?.errors);
    }
  }
  limpiarError(){
    this.error = "";
  }
  limpiarCampos() {
    this.form.reset();
  }
  salir(){
    this.router.navigate(['/home']);
  }

  get nombre() {
    return this.form.get('nombre')?.value;
  }
  get apellido(){
    return this.form.get('apellido')?.value;
  }
  get edad(){
    return this.form.get('edad')?.value;
  }
  get telefono(){
    return this.form.get('telefono')?.value;
  }
  get satisfaccion(){
    return this.form.get('satisfaccion')?.value;
  }
  get recomnendar(){
    return this.form.get('recomendar')?.value;
  }
  get comentario(){
    return this.form.get('comentario')?.value;
  }



}
