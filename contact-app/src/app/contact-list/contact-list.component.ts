import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import {Router} from "@angular/router";
import { ContactD } from '../contact';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts = [];
  public errorMsg;
  
  constructor(private router: Router,private _contactService: ContactService) { }
    
  ngOnInit() {
    this._contactService.getContact()
      .subscribe(data => this.contacts = data,
                error => this.errorMsg = error);
                console.log(this.contacts);
              
  }

  createContact(): void {
    this.router.navigate(['createContact']);
  };

  updateContact(contact: ContactD): void {
    localStorage.removeItem("editContactId");
    localStorage.setItem("editContactId", contact.id.toString());
    this.router.navigate(['editContact']);
  };

  deleteContact(contact: ContactD): void {
    this._contactService.deleteUser(contact.id)
      .subscribe( data => {
        this.contacts = this.contacts.filter(u => u !== contact);
      })
  };
  
}
