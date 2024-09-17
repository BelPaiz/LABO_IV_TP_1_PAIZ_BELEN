import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { AuthenService } from './services/authen.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./loader/loader.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nivel-x-app';
  ocultar:boolean = false;
  mostrar:boolean = false;
  usuario:any;
  mostrarUser:boolean = false;
  dropdownOpen:boolean = false;

  constructor(private router: Router,
    private auth:AuthenService
  ) {
  }
  ngOnInit(){
    this.auth.DatosAutenticacion().subscribe({
      next: (email) => {
        if(email){
          this.usuario = email;
          this.mostrarUser = !!email;
        }
        else{
          this.usuario = email;
          this.mostrarUser = !!email;
        }
        this.ocultar = !!email;
        // this.mostrarS = !!email;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        this.mostrar = false;
      }
    })
  }
  goTo(path: string) {
    this.router.navigate([path]);
  }
  muestraMenu(){
    this.mostrar = !this.mostrar;
  }

  cerrarSesion(){
    this.auth.CerrarSesion().then(() => {
      this.router.navigate(['/login']);
    })
    .catch(e => console.log(e));
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
