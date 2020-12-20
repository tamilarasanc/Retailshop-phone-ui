import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userSubject: Subject<any> = new Subject();
  constructor( private messageService: MessageService) {
  }
  loadMessage(type, summary, content) {
    this.messageService.add({severity:type, key: 'myKey1', summary: summary, detail: content});
  }

  updateLoggedUser(value) {
    this.userSubject.next(value)
  }

}
