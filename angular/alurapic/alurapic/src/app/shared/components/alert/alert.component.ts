import { Component, Input } from "@angular/core";
import { AlertService } from "./alert.service";
import { Alert } from "./alert";

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.entryComponents.html'
})
export class AlertComponent {

    @Input() timeout = 3000;
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {

        this.alertService.getAlert()
            .subscribe(alert => {
                setTimeout(() => {});
                this.removeAlert(alert);
            })
    }

    removeAlert(alertToRemove) {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }
}