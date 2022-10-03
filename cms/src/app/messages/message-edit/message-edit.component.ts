import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput')
  subjectInput!: ElementRef;
  
  @ViewChild('messageInput')
  messageInput!: ElementRef;
  
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Colton';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subject = this.subjectInput.nativeElement.value
    const msgText = this.messageInput.nativeElement.value
    console.log(subject, msgText)

    const message = new Message('4', subject, msgText, this.currentSender)

    this.addMessageEvent.emit(message)
  }

  onClear(){
    this.subjectInput.nativeElement.value = ""
    this.messageInput.nativeElement.value = ""
  }

}
