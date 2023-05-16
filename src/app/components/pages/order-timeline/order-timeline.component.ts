import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, filter } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ORDER_STATUS } from 'src/app/constants/orderStatus';
import { Order } from 'src/app/models/order';
import { TicketService } from 'src/app/services/ticket.service';

export interface CardDropEvent {
  clientX: number,
  clientY: number,
  order: Order
}

@Component({
  selector: 'app-order-timeline',
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.scss'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('300ms ease-out',
            style({ opacity: 1 }))
          ]
        ),
      ]
    )
  ]
})
export class OrderTimelineComponent implements OnInit {
  resetCard$: Subject<Order> = new BehaviorSubject<any>(null);
  moveCard$: Subject<CardDropEvent> = new BehaviorSubject<any>(null);
  cardDrop$ = new Subject<CardDropEvent>;

  cardIsMoving = false;
  ORDER_STATUS = ORDER_STATUS;
  currentCardStatus: string;
  hoveringOverSection: string = '';

  @ViewChild('requestedSection') requestedSection: ElementRef;
  @ViewChild('acceptedSection') acceptedSection: ElementRef;
  @ViewChild('inProgressSection') inProgressSection: ElementRef;
  @ViewChild('readySection') readySection: ElementRef;
  @ViewChild('deleteSection') deleteSection: ElementRef;
  @ViewChild('completeSection') completeSection: ElementRef;

  constructor(private ticketService: TicketService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.watchForCardMove();
  }

  ngAfterViewInit() {
    this.watchForCardDrop();
  }

  watchForCardMove(){
    this.moveCard$.pipe(
      filter((event: CardDropEvent | null) => event !== null),
    ).subscribe((event) => {
      if(event === null) return
      this.currentCardStatus = event.order.status;
      this.cardIsMoving = true;

      this.hoveringOverSection = this.getSectionCardIsHoveringOver(event.clientX, event.clientY);
    })
  }

  watchForCardDrop(){
    this.cardDrop$.subscribe((event: CardDropEvent) => {
      this.cardIsMoving = false;
      // const hoveringOverSection = this.getSectionCardIsHoveringOver(event.clientX, event.clientY);
      const currentSection = event.order.status;
      if(this.hoveringOverSection === currentSection || this.hoveringOverSection === "") return this.resetCard$.next(event.order);
      this.updateCardStatus(event.order, this.hoveringOverSection);
    });
  }

  getSectionCardIsHoveringOver(clientX: number, clientY: number){
    let cardInSectionHorizontally, cardInSectionVertically;
    let newSection = '';
    const sections = this.getSectionsToCheckFor();

    sections.forEach((section) => {
      if(!section.rect) return
      cardInSectionHorizontally = clientX > section.rect.left && clientX < section.rect.right;
      cardInSectionVertically = clientY > section.rect.top && clientY < section.rect.bottom;
      if(newSection) return
      if (cardInSectionHorizontally && cardInSectionVertically) {
        newSection = section.section;
      }
    })
    return newSection;
  }

  getSectionsToCheckFor(){
    return [
      {
        section: ORDER_STATUS.DELETED,
        rect: this.deleteSection?.nativeElement.getBoundingClientRect(),
      },
      {
        section: ORDER_STATUS.COMPLETED,
        rect: this.completeSection?.nativeElement.getBoundingClientRect(),
      },
      {
        section: ORDER_STATUS.REQUESTED,
        rect: this.requestedSection.nativeElement.getBoundingClientRect(),
      },
      {
        section: ORDER_STATUS.ACCEPTED,
        rect: this.acceptedSection.nativeElement.getBoundingClientRect(),
      },
      {
        section: ORDER_STATUS.IN_PROGRESS,
        rect: this.inProgressSection.nativeElement.getBoundingClientRect(),
      },
      {
        section: ORDER_STATUS.READY,
        rect: this.readySection.nativeElement.getBoundingClientRect(),
      },
    ];
  }

  updateCardStatus(order: Order, newStatus: string) {
    order.status = newStatus;
    this.ticketService.updateOrder(order._id, order).subscribe((updatedOrders: Order[]) => {
      this.appComponent.tickets$.next(updatedOrders);
    })
  }

}
