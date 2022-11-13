import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messageChangeEvent = new EventEmitter<Message[]>();
    messages: any;
    messageChangedEvent = new Subject<Message[]>();
    maxMessageId: number | undefined;

    constructor(private http: HttpClient) {
      this.getMessages();
    }

    getMessages(){
      this.http.get('https://cse430-cms-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        // success method
        (messages: any) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a: any, b: any) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0)
          this.messageChangedEvent.next(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      )
    }

    getMessage(id: string): Message | null {
        for (const message of this.messages) {
          if (message.id === id) {
            return message;
          }
        }
        return null;
      }

      getMaxId(): number {
        let maxId = 0;
        for (const message of this.messages) {
          const currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        }
        return maxId;
      }

      addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages();
      }
    
      storeMessages() {
        let messages = JSON.stringify(this.messages);
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
    
        this.http.put('https://wdd-430-cms-48f05-default-rtdb.firebaseio.com/messages.json', messages, { headers: headers })
          .subscribe(
            () => {
              this.messageChangedEvent.next(this.messages.slice());
            }
          )
    }
}