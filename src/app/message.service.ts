import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  constructor() { }
}
