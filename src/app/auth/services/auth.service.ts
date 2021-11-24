import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(
    private http:HttpClient,
  ) { }

  register (name: string, email: string, password: string) {
    const url = `${this._baseUrl}/auth/register`;
    const body = { name, email, password }; 

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok){
            localStorage.setItem("token", resp.token!)
            this._user={
            name: resp.name!
            }
          }
        }),
        map (resp=>resp.ok),
        catchError(err=>of(err.error.message))
      );
        
  }

  login(email: string, password: string) {

    const url = `${this._baseUrl}/auth`;
    const body = { email, password }; 

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok){
            localStorage.setItem("token", resp.token!)
            this._user={
             name: resp.name!
            }
          }
        }),
        map (resp=>resp.ok),
        catchError(err=>of(err.error.message))
      );

  }

  validateToken(): Observable<boolean> {

    const url = `${this._baseUrl}/auth/access-control`;
    const headers = new HttpHeaders()
      .set("x-token", localStorage.getItem("token") || "")

    return this.http.get<AuthResponse>(url, {headers})
              .pipe(
                map(resp=>{
                  localStorage.setItem("token", resp.token!)
                  this._user={
                   name: resp.name!
                  }
                  return resp.ok}),
                  catchError(error=>of(false))
              );
            
  }

  logout() {
    localStorage.clear();
  }



}
