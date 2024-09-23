import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderPuntosPipe } from '../order-puntos.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-puntajes',
  standalone: true,
  imports: [CommonModule, OrderPuntosPipe, FormsModule],
  templateUrl: './puntajes.component.html',
  styleUrl: './puntajes.component.css'
})
export class PuntajesComponent implements OnInit {

  constructor(private firestore: FirestoreService,
    private router: Router,
    public loader: LoaderService
  ){}

  puntajes: any = [];
  private subscription: Subscription = new Subscription();
  contadorAhorcado:number = 0;
  contadorMayMen: number = 0;
  contadorTrivia: number = 0;
  contadorPropio: number = 0;


  ngOnInit(){
    this.loader.setLoader(true);
    this.generarPuntajes();
  }

  generarPuntajes() {
    const subsChat = this.firestore.getPuntajes().subscribe((respuesta) => {
      this.puntajes = respuesta;
    });
    this.subscription.add(subsChat);
    this.loader.setLoader(false);
  }
  salir(){
    this.router.navigate(['/home']);
  }
  sumarContador(juego: string, esperado:string, contador:number){
    let retorno = false;
    if(juego === esperado){
      contador++;
      if(contador < 11){
        retorno = true;
      }
    }
    return retorno;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
