import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { ratingRange } from './rating-range.validator';
import { emailMatcher } from './email-matcher.validator';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'arf-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  get addresses(): FormArray {
    // we use cast operator <FormArray> to cast it to desired type, otherwise it's AbstractControl type
    return <FormArray>this.customerForm.get('addresses')
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: emailMatcher }),
      phone: '',
      notify: 'email',
      rating: ['', ratingRange(1, 5)],
      showCatalog: true,
      addresses: this.fb.array([ this.buildAddressBlock() ])
    });

    this.customerForm.get('notify').valueChanges.subscribe(value => this.setNotification(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage(emailControl));
  }

  addNewAddressBlock(): void {
    this.addresses.push(this.buildAddressBlock());
  }

  buildAddressBlock(): FormGroup {
    return this.fb.group({
      addressType: '',
      street1: '',
      street2: '',
      zip: ''
    })
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required)
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  save(): void {
    console.log(this.customerForm);
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

}
