import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../jwt/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9]).{6,}$')
      ]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register({ email, password }).subscribe({
        next: (response) => {
          this.successMessage = response.Message;
          this.registerForm.reset();
          setTimeout(() => {
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          if (error.error && error.error.Message) {
            this.errorMessage = error.error.Message; 
            if (error.error.Errors) {
              
              this.errorMessage += ": " + error.error.Errors.join(", ");
            }
          } else {
            this.errorMessage = 'Error al registrar usuario';
          }
          this.registerForm.patchValue({ password: '' });
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}