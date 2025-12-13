import { AdminMetric } from './admin-metric.interface';

export interface AdminMetricsResponse {
  message: string;
  metrics: AdminMetric[];
}
