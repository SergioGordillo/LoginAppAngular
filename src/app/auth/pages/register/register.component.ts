import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router ) { }

  register() {
    console.log(this.myForm.value);

    this.router.navigateByUrl('/dashboard');
  }

}
