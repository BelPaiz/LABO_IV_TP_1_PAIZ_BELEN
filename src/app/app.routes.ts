import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'quienSoy', component:QuienSoyComponent},




    { path: '**',  component: PaginaNoEncontradaComponent},
];
