import { Component, OnInit, Output } from '@angular/core';
import { Contact } from './contact-list/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
