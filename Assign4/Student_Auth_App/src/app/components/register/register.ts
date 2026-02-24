import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  userData = { name: '', email: '', password: '' };

  constructor(private router: Router) {}

  onRegister() {
    // Save user to browser local storage
    localStorage.setItem('user', JSON.stringify(this.userData));
    alert('Registration Successful! Redirecting to Login...');
    this.router.navigate(['/login']);
  }
}