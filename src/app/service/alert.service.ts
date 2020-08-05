import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts = new Subject<Alert>();

  constructor() { }

  public getAlerts() {
    return this.alerts;
  }

  private onAlert(alert: Alert) {
    this.alerts.next(alert);
  }

  public success(message: string, delay: number | null = null ) {
    this.onAlert(new Alert({message, delay, type: AlertType.Success}));
  }

  public error(message: string, delay: number | null = null ) {
    this.onAlert(new Alert({message, delay, type: AlertType.Error}));
  }

  public clear() {
    this.alerts.next(new Alert());
  }
}
