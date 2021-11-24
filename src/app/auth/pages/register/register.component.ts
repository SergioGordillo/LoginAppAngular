import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    name: ['test3', Validators.required],
    email: ['test3@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService ) { }

  register() {

    const {name, email, password} = this.myForm.value;
    
    this.authService.register(name, email, password)
    .subscribe(resp => {
      if (resp===true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire("Error", resp, 'error');
      }
    })

    this.router.navigateByUrl('/dashboard');
  }

}
