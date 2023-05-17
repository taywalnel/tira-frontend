import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ModalData {
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalOpen$ = new BehaviorSubject<boolean>(false);
  modalType$ = new BehaviorSubject<string>('');
  modalData$ = new BehaviorSubject<ModalData>(null);
  constructor() { }

  openModal(modalType: string, data?: ModalData){
    this.modalType$.next(modalType);
    this.modalOpen$.next(true);

    if(data){
      this.modalData$.next(data);
    }
  }

  closeModal(){
    this.modalOpen$.next(false);
  }
}
