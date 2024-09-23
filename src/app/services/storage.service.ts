import { Injectable } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  imagenes: string[] = [];

  constructor(private storage: Storage) { }

    SubirImagen($event: any){
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

     return uploadBytes(imgRef, file);
  }

  // Función para listar todas las imágenes en la carpeta 'images'
  listarImagenes(): Promise<any[]> {
    const imagesRef = ref(this.storage, 'images/');
    return listAll(imagesRef).then((res) => {
      const urlsPromises = res.items.map((itemRef) => {
        return getDownloadURL(itemRef); // Obtiene las URLs de cada imagen
      });
      return Promise.all(urlsPromises); // Retorna todas las URLs como un array
    });
  }

  // Función para obtener la URL de una imagen específica
  obtenerImagen(imagenNombre: string): Observable<string> {
    const imgRef = ref(this.storage, `images/${imagenNombre}`);
    return new Observable((observer) => {
      getDownloadURL(imgRef).then((url) => {
        observer.next(url);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  SubirMp3($event: any){
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `sounds/${file.name}`);

     return uploadBytes(imgRef, file);
  }

  obtenerSonido(sonidoNombre: string): Observable<string> {
    const imgRef = ref(this.storage, `sounds/${sonidoNombre}`);
    return new Observable((observer) => {
      getDownloadURL(imgRef).then((url) => {
        observer.next(url);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
  SubirFont($event: any){
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `fonts/${file.name}`);

     return uploadBytes(imgRef, file);
  }
  obtenerFuente(fuenteNombre: string): Observable<string> {
    const imgRef = ref(this.storage, `fonts/${fuenteNombre}`);
    return new Observable((observer) => {
      getDownloadURL(imgRef).then((url) => {
        observer.next(url);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // getImages(){
  //   const imagesRef = ref(this.storage, 'images');
  //   listAll(imagesRef)
  //   .then(async respuesta => {
  //     console.log(respuesta);
  //     this.imagenes = [];
  //     for(let item of respuesta.items){
  //       const url = await getDownloadURL(item);
  //       console.log(url);
  //       this.imagenes.push(url);
  //     }
  //   })
  //   .catch(error => console.log(error));
  //   return this.imagenes;
  // }
  // getImageUrl(){
    
  // }
}
