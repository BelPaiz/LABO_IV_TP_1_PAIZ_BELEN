import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent implements OnInit{

  constructor(private storage: StorageService,
    public loader: LoaderService
  ){}

  imagen: string = "";

  ngOnInit(){
    this.loader.setLoader(true);
    this.traerImagen();
  }

  traerImagen(){
    const nombreImagen = 'img_qs.jpg';
    this.storage.obtenerImagen(nombreImagen).subscribe({
      next: (url) => {
        this.imagen = url;
        this.loader.setLoader(false);
      },
      error: (err) => {
        console.error('Error al obtener la imagen: ', err);
      }
    });
  }


}
