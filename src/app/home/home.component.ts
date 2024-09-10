import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenService } from '../services/authen.service';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'nivel-x-app';
  usuario:any;
  chatCol: any;
  counts: number = 0;
  mensajes: any[] = [];
  fecha_hora: any;
  usuario_chat: string = "";


  constructor(private router: Router,
    private auth:AuthenService,
    private firestore: FirestoreService
  ) {}
  ngOnInit(){

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
}
