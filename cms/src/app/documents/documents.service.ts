import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './documents.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documents: any; //kept erroring out if I didn't make this any
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): any {
    this.http.get('https://cse430-cms-default-rtdb.firebaseio.com/documents.json')

    .subscribe(
      // success method
      (documents: any) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a: any, b: any) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
        this.documentChangedEvent.next(this.documents.slice());
      },
      // error method
      (error: any) => {
        console.log(error);
      }
    )
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd-430-cms-48f05-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe(
        () => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      )
  }
}
