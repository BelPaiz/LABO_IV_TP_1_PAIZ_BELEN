import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragonAPIService } from '../services/dragon-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { FirestoreService } from '../services/firestore.service';
import { AuthenService } from '../services/authen.service';


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
    private cd: ChangeDetectorRef,
    public loader: LoaderService,
    public firestore: FirestoreService,
    private auth:AuthenService
  ){}

  max_id:number = 44;
  id_generado:number = 0;
  personajeElegido:any;
  excludedIds: number[] = [41, 36];
  noExisten: number[] = [41, 36];
  descripcion:string = "";
  opcion:string[] = [];
  elegido:string = "";
  ocultarJuego:boolean = false;
  finalJuego:boolean = false;
  contadorPuntos:number = 0;
  usuario: string = "";
  private subscription: Subscription = new Subscription();
  correcto:boolean = false;
  incorrecto:boolean = false;
  vidas:string[] = [];
  audioCorrecto = new Audio('../../assets/Db_track1.mp3');
  audioIncorrecto = new Audio('../../assets/DB_sound2.mp3');

  ngOnInit(): void {
    this.EmpezarJuego();
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

  EmpezarJuego(){
    this.id_generado = 0;
    this.noExisten = [41, 36];
    this.excludedIds = [41, 36];
    this.elegido = "";
    this.contadorPuntos = 0;
    this.finalJuego = false;
    this.ocultarJuego = false;
    this.vidas = ["../../assets/vidas.png", "../../assets/vidas.png", 
      "../../assets/vidas.png", "../../assets/vidas.png", "../../assets/vidas.png"];
    this.loader.setLoader(true);
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
      this.generarOpciones(this.personajeElegido.name);
      
    } catch (error) {
      console.error('Error al obtener el personaje:', error);
    }
    this.loader.setLoader(false);
  }
  async generarOpciones(p:string) {
    try {
      this.opcion = [];
      this.opcion.push(p);
      while (this.opcion.length < 4) {
        let personaje: any = await this.traerPersonaje();
        if (!this.opcion.includes(personaje.name)) {
          this.opcion.push(personaje.name);
        }
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
  }

  verificaAcierto(){
    if(this.personajeElegido.name === this.elegido){
      this.contadorPuntos ++;
      this.audioCorrecto.play();
      this.correcto = true;
        this.ocultarJuego = true;
        setTimeout(()=>{
          this.correcto = false;
          this.ocultarJuego = false;
          this.finDelJuego();
        }, 1500);
        this.elegido = "";
        this.guardarPersonaje();
    }
    else{
      this.audioIncorrecto.play();
      this.incorrecto = true;
        this.ocultarJuego = true;
    }
    
  }

  finDelJuego(){
    if(this.excludedIds.length === 40){
      this.ocultarJuego = true;
      this.finalJuego = true;
      this.guardarPuntos();
    }
    else{
      if(this.vidas.length === 0){
        this.ocultarJuego = true;
        this.finalJuego = true;
      this.guardarPuntos();
      }
    }
  }
  continuar(){
      this.incorrecto = false;
      this.ocultarJuego = false;
      this.audioIncorrecto.pause();
      this.audioIncorrecto.currentTime = 0;
      this.vidas.pop();
      this.finDelJuego();
      this.elegido = "";
      this.guardarPersonaje();
  }
  guardarPuntos(){
    if(this.contadorPuntos !== 0){
      this.firestore.setPuntajes(this.usuario, "trivia", this.contadorPuntos);
    }
  }

  salirJuego(){
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
