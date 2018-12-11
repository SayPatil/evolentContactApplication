import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User } from '../user';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  constructor(private formBuilder: FormBuilder,private router: Router,private _contactService: ContactService) { }
  addForm: FormGroup;
  submitted = false;
 
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.pattern(this.mobnumPattern)]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
  }

    this._contactService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['contactList']);
      });
  }

}
