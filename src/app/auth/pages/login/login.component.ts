import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.fb.group({
    email: ['test3@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService ) { }

  login () {

    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp===true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire("Error", resp, 'error');
        }
      })
  }


}
