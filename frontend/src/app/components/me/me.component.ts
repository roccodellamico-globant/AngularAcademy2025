import { Component, signal } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { routes } from '../../app.routes';



@Component({
  selector: 'app-me',
  imports: [ DatePipe ],
  templateUrl: './me.component.html',
})
export class MeComponent {
  user = signal<User | null>(null);
  isLoading = signal(true);
  error = signal('');

  constructor( private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err);
      }
    });
  }

  logout = () => {
    this.authService.logout();
  }
}
