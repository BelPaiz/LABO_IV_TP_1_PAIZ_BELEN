import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  usuarioLogueado:string = "";

  constructor(public auth: Auth) { 

  }

  Registro(email:string, password:string, usuarioLogueado:string){
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((resp) => {
      if(resp.user.email !== null) 
       usuarioLogueado = resp.user.email;
      
    }).catch((e) => console.log(e.code));
  }

  Login(email:string, pass:string){
    signInWithEmailAndPassword(this.auth, email, pass).then((res) => {
      if(res.user.email != null) this.usuarioLogueado = res.user.email;
    }).catch((e) => console.log(e))
  }

  CerrarSesion(){
    signOut(this.auth).then(()=>{
      console.log(this.auth.currentUser?.email)
    })
  }
}


