import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, filter } from 'rxjs';
import {
  TICKET_STATUS_CODES,
  TICKET_STATUS_LABELS,
} from 'src/app/constants/ticketStatus';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticketService/ticket.service';

export interface CardDropEvent {
  clientX: number;
  clientY: number;
  order: Ticket;
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow-page.component.html',
  styleUrls: ['./workflow-page.component.scss'],
  animations: [
    trigger('inAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WorkflowPageComponent implements OnInit {
  resetCard$: Subject<Ticket> = new BehaviorSubject<any>(null);
  moveCard$: Subject<CardDropEvent> = new BehaviorSubject<any>(null);
  cardDrop$ = new Subject<CardDropEvent>();

  cardIsMoving = false;
  TICKET_STATUS_CODES = TICKET_STATUS_CODES;
  TICKET_STATUS_LABELS = TICKET_STATUS_LABELS;
  currentCardStatus: string;
  hoveringOverSection: string = '';

  @ViewChild('toDoSection') toDoSection: ElementRef;
  @ViewChild('inProgressSection') inProgressSection: ElementRef;
  @ViewChild('doneSection') doneSection: ElementRef;

  constructor(public ticketService: TicketService) {}

  ngOnInit(): void {
    this.getTickets();
    this.watchForCardMove();
  }

  ngAfterViewInit() {
    this.watchForCardDrop();
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketService.tickets$.next(tickets);
    });
  }

  watchForCardMove() {
    this.moveCard$
      .pipe(filter((event: CardDropEvent | null) => event !== null))
      .subscribe((event) => {
        if (event === null) return;
        this.currentCardStatus = event.order.status;
        this.cardIsMoving = true;

        this.hoveringOverSection = this.getSectionCardIsHoveringOver(
          event.clientX,
          event.clientY
        );
      });
  }

  watchForCardDrop() {
    this.cardDrop$.subscribe((event: CardDropEvent) => {
      this.cardIsMoving = false;
      // const hoveringOverSection = this.getSectionCardIsHoveringOver(event.clientX, event.clientY);
      const currentSection = event.order.status;
      if (
        this.hoveringOverSection === currentSection ||
        this.hoveringOverSection === ''
      )
        return this.resetCard$.next(event.order);
      this.updateCardStatus(event.order, this.hoveringOverSection);
    });
  }

  getSectionCardIsHoveringOver(clientX: number, clientY: number) {
    let cardInSectionHorizontally, cardInSectionVertically;
    let newSection = '';
    const sections = this.getSectionsToCheckFor();

    sections.forEach((section) => {
      if (!section.rect) return;
      cardInSectionHorizontally =
        clientX > section.rect.left && clientX < section.rect.right;
      cardInSectionVertically =
        clientY > section.rect.top && clientY < section.rect.bottom;
      if (newSection) return;
      if (cardInSectionHorizontally && cardInSectionVertically) {
        newSection = section.section;
      }
    });
    return newSection;
  }

  getSectionsToCheckFor() {
    return [
      {
        section: TICKET_STATUS_CODES.TO_DO,
        rect: this.toDoSection?.nativeElement.getBoundingClientRect(),
      },
      {
        section: TICKET_STATUS_CODES.IN_PROGRESS,
        rect: this.inProgressSection?.nativeElement.getBoundingClientRect(),
      },
      {
        section: TICKET_STATUS_CODES.DONE,
        rect: this.doneSection.nativeElement.getBoundingClientRect(),
      },
    ];
  }

  updateCardStatus(ticket: Ticket, newStatus: string) {
    ticket.status = newStatus;
    this.ticketService
      .updateTicket(ticket._id, ticket)
      .subscribe((updatedTickets: Ticket[]) => {
        this.ticketService.tickets$.next(updatedTickets);
      });
  }
}
