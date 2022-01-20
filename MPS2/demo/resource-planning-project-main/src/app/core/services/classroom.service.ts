import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from '../models/classroom.model';
import {Booking} from '../models/booking.model';
import {History} from '../models/history.model';
import {baseUrl} from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) {
  }

  public getClassrooms(): Observable<Classroom[]> {
    const url = baseUrl + '/sali';
    return this.http.get<Classroom[]>(url);
  }

  public getHistory(): Observable<History[]> {
    const url = baseUrl + '/istoric_sali';
    return this.http.get<History[]>(url);
  }

  public getClassroomHistory(id: number): Observable<Booking[]> {
    const url = baseUrl + '/istoric';
    const params = new HttpParams().set('id', id);
    return this.http.get<Booking[]>(url, {params});
  }

  public bookClassroom(idSala: number, idUser: number, start: string, finish: string, motiv: string): Observable<any> {
    const url = baseUrl + '/new_booking';
    const params = new HttpParams()
      .set('id_sala', idSala)
      .set('id_user', idUser)
      .set('start', start)
      .set('finish', finish)
      .set('motiv', motiv);
    return this.http.post<any>(url, {}, {params});
  }

  public addClassroom(nume: string, facultate: string, descriere: string): Observable<any> {
    const url = baseUrl + '/new_sala';
    const params = new HttpParams()
      .set('nume', nume)
      .set('facultate', facultate)
      .set('descriere', descriere);
    return this.http.post<any>(url, {}, {params});
  }

}
