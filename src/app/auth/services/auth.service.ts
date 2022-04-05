import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL

  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private httpCliente: HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.httpCliente.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        this._auth = auth;
        return true;
      })
    )
  }

  login(){
    return this.httpCliente.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap( resp => this._auth = resp),
      tap(resp => localStorage.setItem('token', resp.id))
    );
  }

  logout(){
    this._auth = undefined;
  }


}
