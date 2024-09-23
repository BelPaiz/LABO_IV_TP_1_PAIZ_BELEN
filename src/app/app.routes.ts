import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { RegistroComponent } from './registro/registro.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { JuegoBComponent } from './juego-b/juego-b.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'quienSoy', component:QuienSoyComponent},
    
    {path: 'invaders', component:JuegoBComponent},
    // {path: 'upload', component:UploadComponent},
    
    { 
        path: 'chat', 
        loadComponent: () => import('./chat/chat.component').then(c=>c.ChatComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },

    { 
        path: 'ahorcado', 
        loadComponent: () => import('./ahorcado/ahorcado.component').then(c=>c.AhorcadoComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },

    { 
        path: 'mayor-menor', 
        loadComponent: () => import('./menor-mayor/menor-mayor.component').then(c=>c.MenorMayorComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    
    { 
        path: 'dragon-trivia', 
        loadComponent: () => import('./juego-dragon-ball/juego-dragon-ball.component').then(c=>c.JuegoDragonBallComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },

    { 
        path: 'puntajes', 
        loadComponent: () => import('./puntajes/puntajes.component').then(c=>c.PuntajesComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },

    { 
        path: 'encuesta', 
        loadComponent: () => import('./encuesta/encuesta.component').then(c=>c.EncuestaComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    

    { path: '**',  component: PaginaNoEncontradaComponent},
];
