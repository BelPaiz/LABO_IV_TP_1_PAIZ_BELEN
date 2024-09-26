import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenService } from '../services/authen.service';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'nivel-x-app';

  [key: string]: any;
  usuario:any;
  chatCol: any;
  counts: number = 0;
  mensajes: any[] = [];
  fecha_hora: any;
  usuario_chat: string = "";
  img_fondo: string = "";
  img_chat: string = "";
  img_ahorcado: string = "";
  img_menor_mayor: string = "";
  img_trivia: string = "";
  img_invaders: string = "";
  img_puntajes: string = "";
  img_encuesta: string = "";


  constructor(private router: Router,
    private auth:AuthenService,
    private firestore: FirestoreService,
    private storage: StorageService,
    public loader:LoaderService
  ) {}
  ngOnInit(){
    this.loader.setLoader(true);
    // this.traerImagen(this.img_fondo, 'fondo7.jpg');
    this.traerImagen('img_ahorcado', 'ahorcado.jpg');
    this.traerImagen('img_chat', 'chat.jpg');
    this.traerImagen('img_encuesta', 'encuesta.jpg');
    this.traerImagen('img_invaders', 'invaders.jpg');
    this.traerImagen('img_menor_mayor', 'meyor-menor.jpg');
    this.traerImagen('img_puntajes', 'puntajes.jpg');
    this.traerImagen('img_trivia', 'trivia1.jpg');


  }
  irChat(){
    this.router.navigate(['/chat']);
  }
  irAhorcado(){
    this.router.navigate(['/ahorcado']);
  }
  irmayor_menor(){
    this.router.navigate(['/mayor-menor']);
  }
  irDragon_triviar(){
    this.router.navigate(['/dragon-trivia']);
  }
  irPuntajes(){
    this.router.navigate(['/puntajes'])
  }
  irEncuesta(){
    this.router.navigate(['/encuesta'])
  }
  irAtrapaPunto(){
    this.router.navigate(['/atrapa-punto']);
  }
  traerImagen(imagen:string, path:string){
    const nombreImagen = path;
    this.storage.obtenerImagen(nombreImagen).subscribe({
      next: (url) => {
        this[imagen] = url;
        this.loader.setLoader(false);
      },
      error: (err) => {
        console.error('Error al obtener la imagen: ', err);
      }
    });
  }
}
