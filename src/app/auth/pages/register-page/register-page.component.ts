import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  signupForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.authService.fieldsAreEqual('password', 'passwordCheck'),
      ],
    },
  );

  fields = [
    {
      id: 'name',
      label: 'Name',
      name: 'name',
      helpText: 'Enter name.',
      type: 'text',
    },
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
    {
      id: 'passwordCheck',
      label: 'Write password again',
      name: 'passwordCheck',
      helpText: 'Enter password.',
      type: 'password',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    console.log(this.signupForm.value);

    // this.authService.register(this.signupForm.value).subscribe((resp) => {
    //   console.log(resp);
    //   this.router.navigate(['/auth/login']);
    // });
  }

  get emailErrorMsg(): string {
    const errors = this.signupForm.get('email')?.errors;

    if (errors?.['required']) {
      return 'Correo electrónico es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Correo electrónico no es válido';
    } else if (errors?.['emailTomado']) {
      return 'Correo electrónico ya registrado';
    }
    return '';
  }

  onReset() {
    this.signupForm.reset();
  }
}
