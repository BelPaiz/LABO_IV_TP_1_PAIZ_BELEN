import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPuntos',
  standalone: true
})
export class OrderPuntosPipe implements PipeTransform {

  transform(puntajes: any[], orden: string = 'desc'): any[] {
    if (!puntajes || puntajes.length === 0) {
      return [];
    }
    
    // Ordena los puntajes en base al valor de puntos
    return puntajes.sort((a, b) => {
      if (orden === 'asc') {
        return a.puntos - b.puntos; // Orden ascendente
      } else {
        return b.puntos - a.puntos; // Orden descendente por defecto
      }
    });
  }
}

