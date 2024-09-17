import { CommonModule } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-menor-mayor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './menor-mayor.component.html',
  styleUrl: './menor-mayor.component.css'
})
export class MenorMayorComponent implements OnInit{

  constructor(private router: Router,
    public loader: LoaderService
  ){}

  ngOnInit(): void {
    this.EmpezarJuego();
  }

  reverso:string = "../../assets/mazo/r_mazo.jpg";
  mazo = [
    {
      tipo: "basto",
      numero: 1,
      src:"../../assets/mazo/1_b.jpg"
    },
    {
      tipo: "basto",
      numero: 2,
      src:"../../assets/mazo/2_b.jpg"
    },
    {
      tipo: "basto",
      numero: 3,
      src:"../../assets/mazo/3_b.jpg"
    },
    {
      tipo: "basto",
      numero: 4,
      src:"../../assets/mazo/4_b.jpg"
    },
    {
      tipo: "basto",
      numero: 5,
      src:"../../assets/mazo/5_b.jpg"
    },
    {
      tipo: "basto",
      numero: 6,
      src:"../../assets/mazo/6_b.jpg"
    },
    {
      tipo: "basto",
      numero: 7,
      src:"../../assets/mazo/7_b.jpg"
    },
    {
      tipo: "basto",
      numero: 10,
      src:"../../assets/mazo/10_b.jpg"
    },
    {
      tipo: "basto",
      numero: 11,
      src:"../../assets/mazo/11_b.jpg"
    },
    {
      tipo: "basto",
      numero: 12,
      src:"../../assets/mazo/12_b.jpg"
    },
    {
      tipo: "espada",
      numero: 1,
      src:"../../assets/mazo/1_e.jpg"
    },
    {
      tipo: "espada",
      numero: 2,
      src:"../../assets/mazo/2_e.jpg"
    },
    {
      tipo: "espada",
      numero: 3,
      src:"../../assets/mazo/3_e.jpg"
    },
    {
      tipo: "espada",
      numero: 4,
      src:"../../assets/mazo/4_e.jpg"
    },
    {
      tipo: "espada",
      numero: 5,
      src:"../../assets/mazo/5_e.jpg"
    },
    {
      tipo: "espada",
      numero: 6,
      src:"../../assets/mazo/6_e.jpg"
    },
    {
      tipo: "espada",
      numero: 7,
      src:"../../assets/mazo/7_e.jpg"
    },
    {
      tipo: "espada",
      numero: 10,
      src:"../../assets/mazo/10_e.jpg"
    },
    {
      tipo: "espada",
      numero: 11,
      src:"../../assets/mazo/11_e.jpg"
    },
    {
      tipo: "espada",
      numero: 12,
      src:"../../assets/mazo/12_e.jpg"
    },
    {
      tipo: "oro",
      numero: 1,
      src:"../../assets/mazo/1_o.jpg"
    },
    {
      tipo: "oro",
      numero: 2,
      src:"../../assets/mazo/2_o.jpg"
    },
    {
      tipo: "oro",
      numero: 3,
      src:"../../assets/mazo/3_o.jpg"
    },
    {
      tipo: "oro",
      numero: 4,
      src:"../../assets/mazo/4_o.jpg"
    },
    {
      tipo: "oro",
      numero: 5,
      src:"../../assets/mazo/5_o.jpg"
    },
    {
      tipo: "oro",
      numero: 6,
      src:"../../assets/mazo/6_o.jpg"
    },
    {
      tipo: "oro",
      numero: 7,
      src:"../../assets/mazo/7_o.jpg"
    },
    {
      tipo: "oro",
      numero: 10,
      src:"../../assets/mazo/10_o.jpg"
    },
    {
      tipo: "oro",
      numero: 11,
      src:"../../assets/mazo/11_o.jpg"
    },
    {
      tipo: "oro",
      numero: 12,
      src:"../../assets/mazo/12_o.jpg"
    },
    {
      tipo: "copa",
      numero: 1,
      src:"../../assets/mazo/1_c.jpg"
    },
    {
      tipo: "copa",
      numero: 2,
      src:"../../assets/mazo/2_c.jpg"
    },
    {
      tipo: "copa",
      numero: 3,
      src:"../../assets/mazo/3_c.jpg"
    },
    {
      tipo: "copa",
      numero: 4,
      src:"../../assets/mazo/4_c.jpg"
    },
    {
      tipo: "copa",
      numero: 5,
      src:"../../assets/mazo/5_c.jpg"
    },
    {
      tipo: "copa",
      numero: 6,
      src:"../../assets/mazo/6_c.jpg"
    },
    {
      tipo: "copa",
      numero: 7,
      src:"../../assets/mazo/7_c.jpg"
    },
    {
      tipo: "copa",
      numero: 10,
      src:"../../assets/mazo/10_c.jpg"
    },
    {
      tipo: "copa",
      numero: 11,
      src:"../../assets/mazo/11_c.jpg"
    },
    {
      tipo: "copa",
      numero: 12,
      src:"../../assets/mazo/12_c.jpg"
    },
  ];

  cartas_usadas:any = [];
  carta_elegida = {tipo: "", numero: 0, src:""};
  elegiMayor:boolean = false;
  elegiMenor:boolean = false;
  contadorPuntos:number = 0;
  noEsPrimer:boolean = false;
  carta_num_actual:number = 0;
  carta_num_prox:number = 0;
  ocultarJuego:boolean = false;
  finalJuego:boolean = false;

  EmpezarJuego(){
    this.loader.setLoader(true);
    this.cartas_usadas = [...this.mazo];
    this.carta_elegida = {tipo: "", numero: 0, src:""};
    this.contadorPuntos = 0;
    this.elegiMayor = false;
    this.elegiMenor = false;
    this.carta_num_actual = 0;
    this.carta_num_prox = 0;
    this.noEsPrimer = false;
    this.generarCarta();
    this.finalJuego = false;
    this.ocultarJuego = false;
    this.carta_num_actual = this.carta_elegida.numero;
  }

  generarCarta(){
    const index = Math.floor(Math.random() * this.cartas_usadas.length);
    this.carta_elegida = this.cartas_usadas[index];
    this.eliminoLetraUtilizada(this.carta_elegida);  
    this.loader.setLoader(false);  
    return this.carta_elegida;
  }

  eliminoLetraUtilizada(carta_elegida:any){
    const i = this.cartas_usadas.indexOf(carta_elegida);
    if(i !== -1){
      this.cartas_usadas.splice(i, 1);
    }
  }

  seleccionoMayor(){
    this.elegiMayor = true;
    this.finDelJuego();
    if(this.finalJuego === false){
      this.generarCarta();
      this.carta_num_prox = this.carta_elegida.numero;
    }
    this.verificaAcierto();
    
  }
  seleccionoMenor(){
    this.elegiMenor = true;
    this.finDelJuego();
    if(this.finalJuego === false){
      this.generarCarta();
      this.carta_num_prox = this.carta_elegida.numero;
    }
    this.verificaAcierto();
  }
  verificaAcierto(){
    if(this.cartas_usadas.length === 0){
      this.noEsPrimer = true;
    }

    if(this.carta_num_prox > this.carta_num_actual){
      if(this.elegiMayor === true){
        this.contadorPuntos ++;
        this.elegiMayor = false;
      }
    }
    if(this.carta_num_prox < this.carta_num_actual){
      if(this.elegiMenor === true){
        this.contadorPuntos ++;
        this.elegiMenor = false;
      }
    }
    this.carta_num_actual = this.carta_num_prox;
  }

  finDelJuego(){
    if(this.cartas_usadas.length === 0 && this.noEsPrimer === true){
      this.ocultarJuego = true;
      this.finalJuego = true;
    }
  }


  salirJuego(){
    this.router.navigate(['/home']);
  }
}
