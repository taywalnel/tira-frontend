import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../models/ticket';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tickets: Ticket[], status: string): Ticket[] {
    return tickets.filter(ticket => ticket.status === status);
  }
}
