import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ratingRange } from './rating-range.validator';
import { emailMatcher } from './email-matcher.validator';

@Component({
  selector: 'arf-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.maxLength(20) ]],
      emailGroup: this.fb.group({
        email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+') ]],
        confirmEmail: ['', [ Validators.required ]],
      }, { validator: emailMatcher}),
      phone: '',
      notify: 'email',
      rating: ['', ratingRange(1, 5)],
      showCatalog: true
    });

  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if ( notifyVia === 'text' ) {
      phoneControl.setValidators(Validators.required)
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  save(): void {
    console.log(this.customerForm);
  }

}
