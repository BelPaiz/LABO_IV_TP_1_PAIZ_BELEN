import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragonAPIService {

  constructor(private http: HttpClient) { }
  API_URL: string = 'https://dragonball-api.com/api';

  personajes(peronaje:number): Observable<any>{
    return this.http.get(this.API_URL + '/characters/'+ peronaje )
  }
}
