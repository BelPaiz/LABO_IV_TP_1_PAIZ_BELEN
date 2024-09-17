import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit{
  palabras = [
    {
      tipo: 'fruta',
      palabra: 'Manzana'
    },
    {
      tipo: 'fruta',
      palabra: 'Banana'
    },
    {
      tipo: 'fruta',
      palabra: 'Mandarina'
    },
    {
      tipo: 'fruta',
      palabra: 'Naranja'
    },
    {
      tipo: 'fruta',
      palabra: 'Pomelo'
    },
    {
      tipo: 'fruta',
      palabra: 'Ciruela'
    },
    {
      tipo: 'animal',
      palabra: 'Erizo'
    },
    {
      tipo: 'animal',
      palabra: 'Cotorra'
    },
    {
      tipo: 'animal',
      palabra: 'Elefante'
    },
    {
      tipo: 'animal',
      palabra: 'Pantera'
    },
    {
      tipo: 'animal',
      palabra: 'Cebra'
    },
    {
      tipo: 'animal',
      palabra: 'Rinoceronte'
    },
    {
      tipo: 'pais',
      palabra: 'Paraguay'
    },
    {
      tipo: 'pais',
      palabra: 'Guatemala'
    },
    {
      tipo: 'pais',
      palabra: 'Venezuela'
    },
    {
      tipo: 'pais',
      palabra: 'Colombia'
    },
    {
      tipo: 'pais',
      palabra: 'Uruguay'
    },
    {
      tipo: 'pais',
      palabra: 'Alemania'
    }
  ] 
  

  letras: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  contadorErradas:number = 0;
  palabraElegida = {tipo:"", palabra:""};
  letras_pal:string[] = [];
  letras_espacios:string[] = [];
  letras_utilizadas:string[] = [];
  posiciones: number = 0;
  letras_en_uso: string[]= [];
  ganoJuego:boolean = false;
  pierdeJuego:boolean = false;
  ocultarJuego:boolean = false;

  ocultarCabeza:boolean = true;
  ocultarBrazoD:boolean = true;
  ocultarBrazoI:boolean = true;
  ocultarPieD:boolean = true;
  ocultarPieI:boolean = true;

  constructor(private router: Router,
    public loader: LoaderService
  ){}

  ngOnInit(): void {
    this.loader.setLoader(true);
    this.letras_en_uso = [...this.letras];
    this.generarPalabra();
  }
  
  eliminoLetraUtilizada(letra:string){
    const i = this.letras_en_uso.indexOf(letra);
    if(i !== -1){
      this.letras_en_uso.splice(i, 1);
    }
  }
  generarPalabra(){
    this.letras_en_uso = [...this.letras];
    this.palabraElegida = {tipo:"", palabra:""};
    this.letras_pal = [];
    this.letras_espacios = [];
    this.letras_utilizadas = [];
    this.contadorErradas = 0;
    this.ganoJuego = false;
    this.pierdeJuego = false;
    this.ocultarJuego = false;

    this.ocultarCabeza = true;
    this.ocultarBrazoD = true;
    this.ocultarBrazoI = true;
    this.ocultarPieD = true;
    this.ocultarPieI = true;

    const index = Math.floor(Math.random() * this.palabras.length);
    this.palabraElegida = this.palabras[index];
    this.generarLetrasIncognita();
    this.loader.setLoader(false);
    return this.palabraElegida;
  }
  generarLetrasIncognita(){
    this.posiciones = 0;
    this.posiciones = this.palabraElegida.palabra.length;
    for(let i = 0; i<this.posiciones; i++){
      this.letras_pal.push(this.palabraElegida.palabra[i].toUpperCase());
      this.letras_espacios[i] = "";
    }
  }
  letraSeleccion(letra:string){
    this.eliminoLetraUtilizada(letra);
    this.letras_utilizadas.push(letra);
    this.verificarLetra(letra);
  }
  verificarLetra(letra:string){
    let contadorInicial = this.verificarVacios();
    for(let i = 0; i<this.posiciones; i++){
      if(this.letras_pal[i] === letra){
        this.letras_espacios[i] = letra;
      }
    }
    let contadorFinal = this.verificarVacios();
    if(contadorInicial === contadorFinal){
      this.contadorErradas ++;
      switch(this.contadorErradas){
        case 1:
          this.ocultarCabeza = false;
          break;
          case 2:
            this.ocultarBrazoD = false;
            break;
            case 3:
              this.ocultarBrazoI = false;
              break;
              case 4:
                this.ocultarPieD = false;
                break;
                case 5:
                  this.ocultarPieI = false;
                  break;  
      }
      setTimeout(() => {
      if(this.contadorErradas === 5){
        this.pierdeJuego = true;
        this.ocultarJuego = this.pierdeJuego;
      }},500);
    }
    else{
      if(contadorFinal === 0){
        this.ganoJuego = true;
        this.ocultarJuego = this.ganoJuego;
      }
    }
  }
  verificarVacios(){
    let contador = 0;
    for(let i = 0; i<this.posiciones; i++){
      if(this.letras_espacios[i] === ""){
        contador ++;
      }
    }
    return contador;
  }
  salirJuego(){
    this.router.navigate(['/home']);
  }




}
