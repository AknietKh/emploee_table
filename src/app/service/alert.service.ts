import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() { }

  onAlert() {
    return this.subject.asObservable();
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }

  success(message: string, delay: number | null = null ) {
    this.alert(new Alert({message, delay, type: AlertType.Success}));
  }

  error(message: string, delay: number | null = null ) {
    this.alert(new Alert({message, delay, type: AlertType.Error}));
  }

  clear() {
    this.subject.next(new Alert());
  }
}
