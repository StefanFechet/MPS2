import {EventColor} from 'calendar-utils';

export class Booking {
  id_sala: number;
  id_user: number;
  userName?: string;
  start: Date;
  finish: Date;
  end: Date;
  motiv: string;
  estimat_rezervare: number;
  title: string;
  color: EventColor;
}
