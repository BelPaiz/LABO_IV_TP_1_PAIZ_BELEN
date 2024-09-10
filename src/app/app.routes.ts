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
    {path: 'home', component:HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    {path: 'login', component:LoginComponent},
    {path: 'quienSoy', component:QuienSoyComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'ahorcado', component: AhorcadoComponent},
    { path: 'mayor-menor', component: MenorMayorComponent},
    { path: 'dragon-trivia', component: JuegoDragonBallComponent},
    
    { path: '**',  component: PaginaNoEncontradaComponent},
];
