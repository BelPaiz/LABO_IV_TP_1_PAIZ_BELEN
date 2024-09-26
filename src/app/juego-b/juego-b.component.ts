import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { LoaderService } from '../services/loader.service';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-juego-b',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-b.component.html',
  styleUrl: './juego-b.component.css'
})
export class JuegoBComponent implements OnInit {

  constructor(private router:Router,
    public loader: LoaderService,
    public firestore: FirestoreService,
    private auth:AuthenService
  ){}

  pixeles: number[] = [0, 1, 2, 3, 4, 5, 
                      6, 7, 8, 9, 10, 
                      11, 12, 13, 14, 15, 
                      16, 17, 18, 19, 20, 
                      21, 22, 23, 24]
  posicionPunto: number = -1;
  puntos: number = 0;
  temporizador: any;
  intervalo: number = 1500;
  vidas:string[] = [];
  ocultarJuego:boolean = false;
  contadorErradas:number = 0;
  pierdeJuego:boolean = false;
  usuario:string = "";

  ngOnInit() {
    this.loader.setLoader(true);
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
    this.iniciar();
  }

  iniciar() {
    this.ocultarJuego = false;
    this.pierdeJuego = false;
    this.contadorErradas = 0;
    this.vidas = ["../../assets/vidas.png", 
      "../../assets/vidas.png", 
      "../../assets/vidas.png", 
      "../../assets/vidas.png", 
      "../../assets/vidas.png",
      "../../assets/vidas.png",
      "../../assets/vidas.png",
      "../../assets/vidas.png"];
      this.intervalo = 1500;
      this.puntos = 0;
     this.moverPunto();
  }

  moverPunto() {
    this.loader.setLoader(false);
    clearInterval(this.temporizador);
    this.definirIntervalo(this.intervalo);
  }

  atraparPunto(indice: number) {
    if (indice === this.posicionPunto) {
      this.puntos++;
      this.posicionPunto = -1;
      if(this.intervalo !== 100){
        this.intervalo -= 100;
      } 
      this.moverPunto();
    }
    else{
      this.contadorErradas++;
      this.vidas.pop();
      setTimeout(() => {
      if(this.contadorErradas === 8){
        this.pierdeJuego = true;
        this.ocultarJuego = this.pierdeJuego;
      }},500);
    }
  }

  definirIntervalo(n:number){
    this.temporizador = setInterval(() => {
      this.posicionPunto = Math.floor(Math.random() * 25);
    }, n);
  }

  salirJuego(){
    this.guardarPuntos();
    this.router.navigate(['/home']);
  }

  guardarPuntos(){
    if(this.puntos !== 0){
      this.firestore.setPuntajes(this.usuario, "atrapa-punto", this.puntos);
    }
  }
}
