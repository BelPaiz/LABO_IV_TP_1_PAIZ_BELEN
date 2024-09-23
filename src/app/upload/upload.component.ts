import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  imagenes: string[] = [];
  imagen: string = "";

  ngOnInit(){
    this.listarImagenes();
    
    this.traerImagen();
    }

  constructor(private storage: StorageService
  ){}

  uploadImage($event: any){

    this.storage.SubirImagen($event)
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log(error));
  }

  listarImagenes(){
    this.storage.listarImagenes().then((urls) => {
      this.imagenes = urls;  // Guardar las URLs en el array
      console.log(this.imagenes);
    }).catch((error) => {
      console.error('Error al listar imágenes: ', error);
    });
  }

  traerImagen(){
    const nombreImagen = 'fondo-chat.jpg'; // Cambia esto por el nombre de la imagen que quieras
    this.storage.obtenerImagen(nombreImagen).subscribe({
      next: (url) => {
        this.imagen = url;
      },
      error: (err) => {
        console.error('Error al obtener la imagen: ', err);
      }
    });
  }

  subirMp3($event: any){
    this.storage.SubirMp3($event)
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log(error));
  }

  uploadFont($event: any){
    this.storage.SubirFont($event)
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log(error));
  }

}
