import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {
  @Input() documents!: Document;
  @Output() selectedDocument = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  
  onSelected(){
    this.selectedDocument.emit();
  }

}
