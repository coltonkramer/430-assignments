import { Component, OnInit} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentSelectedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

}
