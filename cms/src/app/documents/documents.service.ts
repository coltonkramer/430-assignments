import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './documents.model';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documents: any; //kept erroring out if I didn't make this any
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: String): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  
  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  
  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentListClone = this.documents.slice();

    this.documentChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === undefined || originalDocument === null || newDocument === undefined || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }
}
