import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ORDER_STATUS } from './constants/orderStatus';
import { Order } from './models/order';
import { TicketService } from './services/ticket.service';

export interface CardDropEvent {
  clientX: number,
  clientY: number,
  order: Order
}

export interface FormattedOrders {
  requested: Order[],
  accepted: Order[],
  inProgress: Order[],
  ready: Order[],
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tickets$: Subject<Order[]> = new BehaviorSubject<Order[]>([]);
  formattedTickets$: Subject<FormattedOrders> = new BehaviorSubject<FormattedOrders>({requested: [], accepted: [], inProgress: [], ready: []});

  currentOrders: {
    requested: Order[],
    accepted: Order[],
    inProgress: Order[],
    ready: Order[],
  } = {
    requested: [],
    accepted: [],
    inProgress: [],
    ready: [],
  };
  title = 'restaurant-business-frontend';
  cardIsMoving = false;
  ORDER_STATUS = ORDER_STATUS;
  currentCardStatus: string;
  hoveringOverSection: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getOrders().subscribe(tickets => {
      this.tickets$.next(tickets);
    });
  }
}
