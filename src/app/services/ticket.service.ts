import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    const url = 'http://localhost:3000/ticket/get';
    return this.http.get(url) as Observable<Order[]>;
  }

  public updateOrder(orderId: string, order: Order): Observable<Order[]> {
    const url = `http://localhost:3000/ticket/update/${orderId}`;
    const body = order;
    return this.http.put(url, body) as Observable<Order[]>;
  }

  public deleteOrder(orderId: string): Observable<Order[]> {
    const url = `http://localhost:3000/ticket/delete/${orderId}`;
    return this.http.delete(url) as Observable<Order[]>;
  }
}


