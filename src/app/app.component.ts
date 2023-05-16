import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ORDER_STATUS } from './constants/orderStatus';
import { Order } from './models/order';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tickets$: Subject<Order[]> = new BehaviorSubject<Order[]>([]);
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
