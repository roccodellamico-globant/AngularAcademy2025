import { Component, OnInit, signal } from '@angular/core';
import { MetricsService } from '../../services/metrics.service';
import { AdminMetric } from '../../interfaces/admin-metric.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-metrics',
  imports: [ DatePipe ],
  templateUrl: './admin-metrics.component.html',
})
export class AdminMetricsComponent {
  metrics = signal<AdminMetric[]>([]);
  isLoading = signal(true);
  error = signal('');

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getAdminMetrics().subscribe({
      next: (metrics) => {
        this.metrics.set(metrics);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }


}
