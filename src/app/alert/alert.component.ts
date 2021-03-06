import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert, AlertType } from '../model/alert.model';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  public alerts: Alert[] = [];
  private alertSubscription: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlerts().subscribe(alert => {
      if (!alert.message) {
        this.alerts = [];
      }

      this.alerts.push(alert);

      if (alert.delay) {
        setTimeout(() => this.removeAlert(alert), alert.delay);
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }

  public removeAlert(alert: Alert) {
    if (this.alerts.indexOf(alert) === -1) {
      return;
    }

    this.alerts = this.alerts.filter(item => item !== alert );
  }

  public cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    const classes = ['alert'];

    const AlertTypeClass =  {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger'
    };

    classes.push(AlertTypeClass[alert.type]);
    return classes.join(' ');
  }
}
