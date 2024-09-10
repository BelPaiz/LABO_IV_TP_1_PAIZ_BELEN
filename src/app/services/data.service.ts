import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ocultoValor = new BehaviorSubject<boolean>(false);
  oculto$ = this.ocultoValor.asObservable();

  private usuarioValor = new BehaviorSubject<any>("");
  usuario$ = this.usuarioValor.asObservable();

  // @Output() oculto:EventEmitter<any> = new EventEmitter();

  constructor() { }

  setOculto(oculto:boolean){
    this.ocultoValor.next(oculto);
  }

  setUsuario(usuario:any){
    this.usuarioValor.next(usuario);
  }
}
