import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../documents.model';


@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {
  @Input() documents!: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
