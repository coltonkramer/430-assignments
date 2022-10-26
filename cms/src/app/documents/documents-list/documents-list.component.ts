import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
    this.subscription = this.documentsService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
