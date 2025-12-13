import { Component, signal } from '@angular/core';
import { MetricsService } from '../../services/metrics.service';
import { MetricsUser } from '../../interfaces/user-metrics.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-metrics',
  imports: [ DatePipe ],
  templateUrl: './user-metrics.component.html',
})
export class UserMetricsComponent {
  metrics = signal<MetricsUser[]>([]);
  isLoading = signal(true);
  error = signal('');

  constructor( private metricsService: MetricsService ) {}

  ngOnInit(): void {
    this.metricsService.getUserMetrics().subscribe({
      next: (metrics) => {
        this.metrics.set(metrics),
        this.isLoading.set(false)
      },
      error: (err) => {
        this.error.set(err),
        this.isLoading.set(false)
      }
    })
  }
}
