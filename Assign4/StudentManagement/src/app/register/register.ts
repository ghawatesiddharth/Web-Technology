import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerData: any = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    year: '',
  };

  students: any[] = [];

  onRegister() {
    this.students.push({ ...this.registerData });

    this.registerData = {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      year: '',
    };
  }

}
