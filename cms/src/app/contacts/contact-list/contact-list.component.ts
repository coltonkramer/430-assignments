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
  contacts: any;
  term: String = '';

  constructor(private contactService: ContactService) { 

   }

  ngOnInit(): void {
    this.subscription = this.contactService.contactChangedEvent
    .subscribe((contacts: any) => {
      this.contacts = contacts;
    });
    this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }

}
