import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets$ = new BehaviorSubject<Ticket[]>([]);
  constructor(private http: HttpClient) { }

  public createTicket(order: Ticket): Observable<Ticket[]> {
    const url = 'http://localhost:3000/ticket/create';
    const body = order;
    return this.http.post(url, body) as Observable<Ticket[]>;
  }

  public getTickets(): Observable<Ticket[]> {
    const url = 'http://localhost:3000/ticket/get';
    return this.http.get(url) as Observable<Ticket[]>;
  }

  public updateTicket(orderId: string, order: Ticket): Observable<Ticket[]> {
    const url = `http://localhost:3000/ticket/update/${orderId}`;
    const body = order;
    return this.http.put(url, body) as Observable<Ticket[]>;
  }

  public deleteTicket(orderId: string): Observable<Ticket[]> {
    const url = `http://localhost:3000/ticket/delete/${orderId}`;
    return this.http.delete(url) as Observable<Ticket[]>;
  }
}


