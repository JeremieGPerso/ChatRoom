import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../core/redux/auth.reducer';
import { AsyncPipe } from '@angular/common';
import { resetLogin } from '../../../core/redux/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  auth$: Observable<AuthState> = this.store.select('auth');

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['member1@test.com', [Validators.required, Validators.email]],
      password: ['pass1', [Validators.required, Validators.minLength(5)]],
    });

    this.auth$.subscribe((auth) => {
      if (auth.token) {
        this.router.navigateByUrl('/conversations');
      }
    })
  }

  submitLogin() {
    if (this.form.invalid) {
      return;
    }
    
    this.authService.login(this.form.value).subscribe();
  }

  clearError() {
    this.store.dispatch(resetLogin());
  }
}
