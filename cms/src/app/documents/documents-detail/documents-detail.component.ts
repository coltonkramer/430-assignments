import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';


@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {
  documents!: Document | null;
  nativeWindow: any;

  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute, private windowRefService: WindRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.documents = this.documentService.getDocument(params['id']);
      }
    )
  }
  onDelete() {
    this.documentService.deleteDocument(this.documents!);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onView() {
    if (this.documents!.url) {
      this.nativeWindow.open(this.documents!.url);
    }
  }
}
