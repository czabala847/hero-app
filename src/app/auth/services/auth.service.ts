import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $urlBase: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.$urlBase}/usuarios/1`);
  }
}
