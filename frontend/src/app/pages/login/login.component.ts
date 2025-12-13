import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  backendError = signal('');
  isLoading = signal(false);
  loginForm;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.isLoading.set(true);

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['dashboard']),
      error: (msg) => {
        this.backendError.set(msg.message);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false)
    });
  }

  hasError(control: string, error: string) {
    return this.loginForm.get(control)?.touched &&
           this.loginForm.get(control)?.hasError(error);
  }
}
