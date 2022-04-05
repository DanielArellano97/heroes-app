import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUR: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUR}/heroes`);
  }

  getHeroePorID(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUR}/heroes/${id}`);
  }

  getSugerencias(termino: string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUR}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUR}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUR}/heroes/${heroe.id}`, heroe);
  }

  eliminarHeroe(id: string):Observable<any>{
    return this.http.delete<any>(`${this.baseUR}/heroes/${id}`);
  }
}
