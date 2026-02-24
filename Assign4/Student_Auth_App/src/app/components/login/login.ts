import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for hidden messages

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.loginData.email === savedUser.email && this.loginData.password === savedUser.password) {
      alert('Login Successful!');
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid Email or Password!';
    }
  }
}