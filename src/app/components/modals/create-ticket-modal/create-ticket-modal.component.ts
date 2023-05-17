import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { TicketService } from 'src/app/services/ticketService/ticket.service';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.scss']
})
export class CreateTicketModalComponent implements OnInit {
  loading = false;
  dateInputMinimum = new Date();
  formGroup: FormGroup;
  ticketStatusOptions = [
    { value: 'toDo', label: 'To do' },
    { value: 'inProgress', label: 'In progress' },
    { value: 'done', label: 'Done' },
  ];
  ticketPriorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];
  ticketSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]
  constructor(public modalService: ModalService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dateDue: new FormControl('', []),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('medium', [Validators.required]),
      size: new FormControl('', []),
    });
    this.modalService.modalData$.subscribe((data) => {
      if(data['status']){
        this.formGroup.controls['status'].setValue(data['status']);
      }
    });
  }

  handleCloseModal(){
    this.modalService.closeModal();
    this.formGroup.reset();
    this.formGroup.controls['priority'].setValue('medium', {emitEvent: false});
  }

  handleCreateTicket(){
    this.loading = true;
    const newTicket: Ticket = this.getNewTicketFromFormGroup(this.formGroup.value);
    this.ticketService.createTicket(newTicket).subscribe((tickets) => {
      this.loading = false;
      this.ticketService.tickets$.next(tickets);
      this.handleCloseModal();
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

  getNewTicketFromFormGroup(formValue: any): Ticket {
    const newTicket: Ticket = {
      title: formValue.title,
      description: formValue.description,
      dateCreated: new Date().toDateString(),
      dateDue: this.formatDate(formValue.dateDue),
      status: formValue.status,
      priority: formValue.priority,
      size: formValue.size,
    };
    return newTicket;
  }

  formatDate(date: Date): string {
    if(date){
      return date.toDateString()
    }
    return null;
  }
}
