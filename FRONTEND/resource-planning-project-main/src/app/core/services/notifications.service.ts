import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification.model';
import {baseUrl} from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  public getNotificationsById(id: string): Observable<Notification[]> {
    const url = baseUrl + '/notificari_user';
    const params = new HttpParams().set('id_user', id);
    return this.http.get<Notification[]>(url, {params});
  }

  public markReadNotification(id: string): Observable<any> {
    const url = baseUrl + '/mark_read_notification';
    const params = new HttpParams().set('id', id);
    return this.http.put<any>(url, {}, {params});
  }

  public deleteNotification(id: string): Observable<any> {
    const url = baseUrl + '/delete_notification';
    const params = new HttpParams().set('id', id);
    return this.http.delete<any>(url, {params});
  }

  public subscribeNotificari(idSala: number, idUser: number): Observable<any> {
    const url = baseUrl + '/abonare_noua';
    const params = new HttpParams()
      .set('id_sala', idSala)
      .set('id_user', idUser);
    return this.http.post<any>(url, {}, {params});
  }

}
