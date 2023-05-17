import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-order-history',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {
  orders: Ticket[] = [];
  sortingBy: string;
  sortingDirection = 'asc';

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
    // this.appComponent.tickets$.subscribe((orders) => {
    //   this.orders = orders;
    //   this.sortBy('dateCreated');
    //   this.reverseSorting();
    // })
  }

  sortHandler(field: string): void {
    if(this.isAlreadySortingByField(field)){
      this.reverseSorting();
      return;
    }

    if(field === 'dateCreated'){
      this.orders = this.sortByDate();
    }else {
      this.orders = this.sortBy(field);
    }

    this.reverseSorting();
  }

  sortBy(field: string): Ticket[] {
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
    this.sortingBy = 'dateCreated';
    this.sortingDirection = 'asc';
    return this.orders.sort((a, b) => {
      if(new Date(a.dateCreated).getTime() > new Date(b.dateCreated).getTime()){
        return 1;
      }
      if(new Date(a.dateCreated).getTime() < new Date(b.dateCreated).getTime()){
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
