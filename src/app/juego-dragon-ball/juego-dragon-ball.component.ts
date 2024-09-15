import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragonAPIService } from '../services/dragon-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-juego-dragon-ball',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule
  ],
  templateUrl: './juego-dragon-ball.component.html',
  styleUrl: './juego-dragon-ball.component.css'
})
export class JuegoDragonBallComponent implements OnInit {
  constructor(
    private api: DragonAPIService,
    private router: Router,
    private cd: ChangeDetectorRef
  ){}

  max_id:number = 44;
  id_generado:number = 0;
  personajeElegido:any;
  excludedIds: number[] = [41, 36];
  descripcion:string = "";
  opcion:string[] = [];
  elegido:string = "";
  ocultarJuego:boolean = false;
  finalJuego:boolean = false;
  contadorPuntos:number = 0;
  private subscription: Subscription = new Subscription();
  loading: boolean = true;

  ngOnInit(): void {
    this.guardarPersonaje();
  }

  EmpezarJuego(){
    this.id_generado = 0;
    this.excludedIds = [41, 36];
    this.elegido = "";
    this.contadorPuntos = 0;
    this.finalJuego = false;
    this.ocultarJuego = false;
    this.loading = true;
    this.guardarPersonaje();
  }

  elegirAleatorio() {
    let randomId: number;
    do {
      randomId = Math.floor(Math.random() * this.max_id) + 1;
    } while (this.excludedIds.includes(randomId));
    this.id_generado = randomId;
  }

  traerPersonaje() {
    return new Promise((resolve, reject) => {
      this.elegirAleatorio();
      const subsPers = this.api.personajes(this.id_generado).subscribe(data => {
        resolve(data);
        this.subscription.add(subsPers);
      }, error => {
        reject(error);
      });
    });
  }
  async guardarPersonaje() {
    try {
      this.personajeElegido = await this.traerPersonaje();
      this.descripcion = this.personajeElegido.description;
      this.excludedIds.push(this.personajeElegido.id);
      console.log(this.excludedIds);
      console.log(this.personajeElegido);
      this.generarOpciones(this.personajeElegido.name);
      
    } catch (error) {
      console.error('Error al obtener el personaje:', error);
    }
    if(this.personajeElegido){
      setTimeout(()=>{this.loading = false;},1000);
    }
  }
  async generarOpciones(p:string) {
    try {
      this.opcion = [];
      this.opcion.push(p);
      for (let i = 1; i < 4; i++) {
        let personaje: any = await this.traerPersonaje();
        this.opcion.push(personaje.name);
      }
      this.mezclarArray(this.opcion);
    } catch (error) {
      console.error('Error al generar opciones:', error);
    }
  }
  mezclarArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  obtenerElegido(eleccion: string){
    this.elegido = eleccion;
    this.verificaAcierto();
    this.finDelJuego();
  }

  verificaAcierto(){
    if(this.personajeElegido.name === this.elegido){
      this.contadorPuntos ++;
      console.log(this.contadorPuntos);
    }
    this.cd.detectChanges();
      this.elegido = "";
      this.guardarPersonaje();
  }

  finDelJuego(){
    console.log(this.excludedIds.length);
    if(this.excludedIds.length === 42){
      this.ocultarJuego = true;
      this.finalJuego = true;
    }
  }

  salirJuego(){
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
