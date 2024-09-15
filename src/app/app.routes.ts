import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { RegistroComponent } from './registro/registro.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ChatComponent } from './chat/chat.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MenorMayorComponent } from './menor-mayor/menor-mayor.component';
import { JuegoDragonBallComponent } from './juego-dragon-ball/juego-dragon-ball.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'quienSoy', component:QuienSoyComponent},
    { path: 'registro', component: RegistroComponent},
    { 
        path: 'chat', 
        loadComponent: () => import('./chat/chat.component').then(c=>c.ChatComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    { path: 'ahorcado', component: AhorcadoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'mayor-menor', component: MenorMayorComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},    
    { 
        path: 'dragon-trivia', 
        loadComponent: () => import('./juego-dragon-ball/juego-dragon-ball.component').then(c=>c.JuegoDragonBallComponent),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    { path: '**',  component: PaginaNoEncontradaComponent},
];
