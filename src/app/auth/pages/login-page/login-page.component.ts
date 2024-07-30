import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['test3@test.com', [Validators.required, Validators.email]],
    password: ['Test12ABC!', [Validators.required, Validators.minLength(6)]],
  });

  fields = [
    {
      id: 'email',
      label: 'Email',
      name: 'email',
      helpText: 'Enter email.',
      type: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      name: 'password',
      helpText: 'Enter password.',
      type: 'password',
    },
    // {
    //   id: 'remember',
    //   label: 'Remember me',
    //   name: 'remember',
    //   helpText: 'Remember me.',
    //   type: 'checkbox',
    // },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (message) => {
        {
        }
      },
    });
  }
}
