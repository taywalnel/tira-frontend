import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  sortingBy: string;
  sortingDirection = 'asc';

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.appComponent.tickets$.subscribe((orders) => {
      this.orders = orders;
      this.sortBy('timeOfCreation');
      this.reverseSorting();
    })
  }

  sortHandler(field: string): void {
    if(this.isAlreadySortingByField(field)){
      this.reverseSorting();
      return;
    }

    if(field === 'timeOfCreation'){
      this.orders = this.sortByDate();
    }else {
      this.orders = this.sortBy(field);
    }

    this.reverseSorting();
  }

  sortBy(field: string): Order[] {
    this.sortingBy = field;
    this.sortingDirection = 'asc';
    return this.orders.sort((a, b) => {
      if(a[field as keyof typeof a] > b[field as keyof typeof b]){
        return 1;
      }
      if(a[field as keyof typeof a] < b[field as keyof typeof b]){
        return -1;
      }
      return 0;
    })
  }

  sortByDate(){
    this.sortingBy = 'timeOfCreation';
    this.sortingDirection = 'asc';
    return this.orders.sort((a, b) => {
      if(new Date(a.timeOfCreation).getTime() > new Date(b.timeOfCreation).getTime()){
        return 1;
      }
      if(new Date(a.timeOfCreation).getTime() < new Date(b.timeOfCreation).getTime()){
        return -1;
      }
      return 0;
    })
  }

  isAlreadySortingByField(field: string): boolean {
    return this.sortingBy === field;
  }

  reverseSorting(): void {
    this.sortingDirection = this.sortingDirection === 'asc' ? 'desc' : 'asc';
    this.orders = this.orders.reverse();
  }
}
