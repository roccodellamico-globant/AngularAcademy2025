import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordAgain = control.get('passwordAgain')?.value;

  if (!password || !passwordAgain) return null;

  return password === passwordAgain
    ? null
    : { mismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  backendError = signal('');
  isLoading = signal(false);
  registerForm;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d).{8,}$/)]],
      passwordAgain: ['', [Validators.required]]
      },
      {
        validators: passwordMatchValidator
      }
  );
  }

  submitForm() {
    if( this.registerForm.invalid ){
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password, passwordAgain } = this.registerForm.getRawValue();

    this.isLoading.set(true);

    this.authService.register(name, email, password).subscribe({
      next: () => this.router.navigate(['login']),
      error: (msg) => {
        this.backendError.set(msg.message);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false)
    });
  }

  hasError(control: string, error: string) {
    if (error === 'mismatch') {
      return (
        this.registerForm.hasError('mismatch') &&
        this.registerForm.get('passwordAgain')?.touched
      );
    }

    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.hasError(error);
  }
}
