import { Component } from '@angular/core';
import { MeComponent } from "../../components/me/me.component";
import { UserMetricsComponent } from "../../components/userMetrics/user-metrics.component";
import { AdminMetricsComponent } from "../../components/adminMetrics/admin-metrics.component";

@Component({
  selector: 'app-metrics',
  imports: [MeComponent, UserMetricsComponent, AdminMetricsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent { }
