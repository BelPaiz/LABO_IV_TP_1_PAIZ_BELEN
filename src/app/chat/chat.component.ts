import { CommonModule } from '@angular/common';
import { Component , ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { AuthenService } from '../services/authen.service';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @ViewChild('mensajesContainer') mensajesContainer!: ElementRef;
  nuevoMensaje:string = "";
  usuario:any;
  fecha:string = "";
  mensajes: any = []; 
  mensajesFire:any = [];
  private subscription: Subscription = new Subscription();
  
  constructor(private firestore: FirestoreService,
    private auth:AuthenService,
    private router: Router,
    public loader: LoaderService
  ){}

  ngOnInit(){
    this.loader.setLoader(true);
    this.auth.DatosAutenticacion().subscribe({
      next: (email) => {
        if(email){
          this.usuario = email;
        }
        else{
          this.usuario = email;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    if(this.mensajes.length === 0){
      this.generarChat();
    } 
    this.loader.setLoader(false);
  }
  generarChat() {
    const subsChat = this.firestore.getDataChat().subscribe((respuesta) => {
      this.mensajes = respuesta;
      this.scrollAuto();
    });
    this.subscription.add(subsChat);
  }
  enviarMensaje(){
    if(this.nuevoMensaje !== ''){
      this.firestore.chatNew(this.nuevoMensaje, this.usuario);
      this.nuevoMensaje = "";
    }
  }

  salirChat(){
    this.router.navigate(['/home']);
  }

  ngAfterViewChecked() {
    this.scrollAuto();
  }

  scrollAuto() {
    try {
      if (this.mensajesContainer && this.mensajesContainer.nativeElement) {
        const element = this.mensajesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error en el auto-scroll:', err);
    }
  }

  formatDateTime(time: Timestamp): string {
    const date = time.toDate();
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  

    return `el ${day}/${month}/${year} a las ${hours}:${minutes}hs.`;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


