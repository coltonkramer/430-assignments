import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contacts.model'
import { ContactService } from '../contacts.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { 

   }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactChangedEvent
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
