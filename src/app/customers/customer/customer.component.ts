import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'arf-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // one way of making reactive form
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });

    // another one
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      showCatalog: true
    });

  }

  save() : void {
    console.log(this.customerForm);
  }

}
