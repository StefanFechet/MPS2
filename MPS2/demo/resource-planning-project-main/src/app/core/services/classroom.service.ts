import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from '../models/classroom.model';
import {Booking} from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) {
  }

  public getClassrooms(): Observable<Classroom[]> {
    const url = 'http://localhost:8080/sali';
    return this.http.get<Classroom[]>(url);
  }

  public getClassroomHistory(id): Observable<Booking[]> {
    const url = 'http://localhost:8080/istoric';
    const params = new HttpParams().set('id', id);
    return this.http.get<Booking[]>(url, {params});
  }

  public bookClassroom(id_sala, id_user, start, finish, motiv): Observable<any> {
    const url = 'http://localhost:8080/new_booking';
    const params = new HttpParams().set('id_sala', id_sala).set('id_user', id_user).set('start', start).set('finish', finish).set('motiv', motiv);
    return this.http.post<any>(url, {}, {params});
  }

}
