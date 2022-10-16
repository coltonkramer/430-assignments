import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput')
  subjectInput!: ElementRef;
  
  @ViewChild('msgText')
  msgText!: ElementRef;
  
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '5';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subject = this.subjectInput.nativeElement.value
    const msgText = this.msgText.nativeElement.value
    const message = new Message('3', subject, msgText, this.currentSender)

    this.addMessageEvent.emit(message)
    this.messageService.addMessage(message)
  }

  onClear(){
    this.subjectInput.nativeElement.value = ""
    this.msgText.nativeElement.value = ""
  }

}
