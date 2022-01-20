import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';
import {baseUrl} from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    const url = baseUrl + '/login/';
    return this.http.get<User[]>(url);
  }

  public registerUser(nume: string, prenume: string, permisiune: number, mail: string, parola: string): Observable<any> {
    const url = baseUrl + '/register';
    const params = new HttpParams()
      .set('nume', nume)
      .set('prenume', prenume)
      .set('permisiune', permisiune)
      .set('mail', mail)
      .set('parola', parola);
    return this.http.post<any>(url, {}, {params});
  }

  public signIn(user: User): void {
    this.addDataToLocalStorage(user);
  }

  public logOut(): void {
    localStorage.removeItem('appData');
  }

  public addDataToLocalStorage(user: any, accessToken?: any): void {
    const appData = {
      accessToken,
      user,
    };
    localStorage.setItem('appData', JSON.stringify(appData));
  }

  public isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('appData')) !== null;
  }

  public isAdmin(): boolean {
    console.log(JSON.parse(localStorage.getItem('appData')).nume);
    return JSON.parse(localStorage.getItem('appData')).user.nume === 'admin';
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('appData')).access_token;
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('appData')).user;
  }

  public getUserId(): string {
    const localData = JSON.parse(localStorage.getItem('appData'));
    if (localData) {
      return localData.user.id;
    }
    return null;
  }

}

