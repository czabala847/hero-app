import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $urlBase: string = environment.urlApi;
  private _auth: Auth | null = null;

  constructor(private http: HttpClient) {}

  get auth() {
    return { ...this._auth };
  }

  verifyAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.$urlBase}/usuarios/1`).pipe(
      map((responseAuth) => {
        this._auth = responseAuth;
        return true;
      })
    );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.$urlBase}/usuarios/1`).pipe(
      tap((responseAuth) => {
        this._auth = responseAuth;
      }),
      tap((responseAuth) => {
        localStorage.setItem('token', responseAuth.id);
      })
    );
  }
}
