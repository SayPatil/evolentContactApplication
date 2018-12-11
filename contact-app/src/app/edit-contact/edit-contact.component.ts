import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { ContactService } from '../contact.service';
import { ContactD } from '../contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: ContactD;
  editForm: FormGroup;
  submitted = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(private formBuilder: FormBuilder,private router: Router, private _contactService: ContactService) { }

  ngOnInit() {
     let userId = localStorage.getItem("editContactId");
     if(!userId){
       alert("invalid Action");
       this.router.navigate(['contactList']);
       return;
     }
     this.editForm = this.formBuilder.group({ id: [],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.pattern(this.mobnumPattern)]
     });
     this._contactService.getUserByName(+userId)
        .subscribe( data =>{
          this.editForm.setValue(data);
        });     
  }
   // convenience getter for easy access to form fields
   get f() { return this.editForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this._contactService.updateContact(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['contactList']);
        },
        error => {
          alert(error);
        });
  }

}



