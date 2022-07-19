import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.$urlBase}/usuarios/1`).pipe(
      tap((responseAuth) => {
        this._auth = responseAuth;
      })
    );
  }
}
