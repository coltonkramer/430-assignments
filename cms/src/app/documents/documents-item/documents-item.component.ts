import { Component, Input, OnInit} from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {
  @Input() documents!: Document;
  @Input() index: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  
}
