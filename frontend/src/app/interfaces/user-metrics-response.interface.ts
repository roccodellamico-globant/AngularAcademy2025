import { MetricsUser } from './user-metrics.interface';

export interface UserMetricsResponse {
  message: string;
  metrics: MetricsUser[];
}
