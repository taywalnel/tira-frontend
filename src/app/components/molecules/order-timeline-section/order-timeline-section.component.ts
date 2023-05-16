import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { Order } from 'src/app/models/order';

export interface ScrollSectionTop {
  section: string,
  top: number,
}

@Component({
  selector: 'app-order-timeline-section',
  templateUrl: './order-timeline-section.component.html',
  styleUrls: ['./order-timeline-section.component.scss'],
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
export class OrderTimelineSectionComponent implements AfterViewInit {
  @Input() orders: Order[] = [];
  @Input() title: string;
  @Input() headerColor: string = '';
  @Input() addMode: boolean = false;
  @Input() showCount: boolean = true;
  @Input() isHovering: boolean = false;

  private cardContainerScroll$: Observable<MouseEvent>;
  public cardContainerScrollTop$: Subject<ScrollSectionTop> = new BehaviorSubject<any>(null);


  @ViewChild('orderContainer') orderContainer: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.cardContainerScroll$ = fromEvent<MouseEvent>(this.orderContainer.nativeElement, 'scroll');
    this.watchForScroll();
  }

  watchForScroll(){
    this.cardContainerScroll$.subscribe((scrollEvent: any) => {
      const scrollOffset = scrollEvent.srcElement.scrollTop;
      this.cardContainerScrollTop$.next({ section: this.title, top: scrollOffset });
    })
  }

}
