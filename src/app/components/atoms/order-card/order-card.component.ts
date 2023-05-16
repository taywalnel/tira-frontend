import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Observable, repeat, skipUntil, takeUntil } from 'rxjs';
import { DISHES } from 'src/app/constants/dishes';
import { Order } from 'src/app/models/order';
import { OrderTimelineSectionComponent } from '../../molecules/order-timeline-section/order-timeline-section.component';
import { OrderTimelineComponent } from '../../pages/order-timeline/order-timeline.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements AfterViewInit {
  @Input() order: Order;

  move$: Observable<MouseEvent>;
  down$: Observable<MouseEvent>;
  up$: Observable<MouseEvent>;
  windowResize$: Observable<Event>;
  startingCardCoOrdinates: {x: number, y: number} | null;
  style = '';
  allowTransitionClass = '';
  cardIsMoving = false;
  cardDimensions: { width: number, height: number };
  scrollOffset: number = 0;

  @ViewChild('card') cardElement: ElementRef;

  constructor(private orderTimeline: OrderTimelineComponent, private orderSectionTimeline: OrderTimelineSectionComponent) { }

  @HostBinding('style.z-index') get invalid() { return this.cardIsMoving ? 100 : 'unset'; }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getCardDimensions();
    }, 50);
    this.initializeObservables();
    this.watchForCardDrop();
    this.watchForCardMove();
    this.watchForResetCard();
    this.watchForWindowResize();
    this.watchForSectionScroll();
  }

  getCardDimensions(){
    this.cardDimensions = {
      width: this.cardElement.nativeElement.offsetWidth - 20,
      height: this.cardElement.nativeElement.offsetHeight - 20
    }
  }

  initializeObservables(){
    this.down$ = fromEvent<MouseEvent>(this.cardElement.nativeElement,'mousedown');
    this.move$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.up$ = fromEvent<MouseEvent>(this.cardElement.nativeElement, 'mouseup');
    this.windowResize$ = fromEvent<Event>(window, 'resize').pipe(debounceTime(100));
  }

  watchForCardDrop(){
    this.up$.subscribe((event) => {
      this.orderTimeline.cardDrop$.next({ clientX: event.clientX, clientY: event.clientY, order: this.order });
      this.startingCardCoOrdinates = null;
      setTimeout(() => {
        this.cardIsMoving = false;
        this.transformCard(0, 0, 'unset', 'unset');
      }, 300)
    });
  }

  watchForCardMove(){
    this.move$.pipe(
      skipUntil(this.down$),
      takeUntil(this.up$),
      repeat()
    ).subscribe((event) => {
      this.cardIsMoving = true;
      this.orderTimeline.moveCard$.next({ clientX: event.clientX, clientY: event.clientY, order: this.order });

      this.allowTransitionClass = '';
      if(!this.startingCardCoOrdinates) return this.initializeStartingCoOrdinates(event);

      const verticalChange =  event.clientY - this.startingCardCoOrdinates.y;
      const horizontalChange = event.clientX - this.startingCardCoOrdinates.x;
      this.transformCard(verticalChange, horizontalChange, this.cardDimensions.width + 'px', this.cardDimensions.height + 'px');
    });
  }

  watchForResetCard(){
    this.orderTimeline.resetCard$.subscribe((order: Order | null) => {
      if(!this.cardThatWasJustDroppedIsThisCard(order?._id)) return;
      this.allowTransitionClass = 'allow-transition';
      this.scrollOffset = 0;
      this.transformCard(0, 0, this.cardDimensions.width + 'px', this.cardDimensions.height + 'px');
    })
  }

  cardThatWasJustDroppedIsThisCard(dropCardId: string | undefined){
    return dropCardId === this.order._id;
  }

  watchForWindowResize(){
    this.windowResize$.subscribe(() => {
      this.getCardDimensions();
    })
  }

  watchForSectionScroll(){
    this.orderSectionTimeline.cardContainerScrollTop$.pipe(
      takeUntil(this.down$)
    ).subscribe((event) => {
      if(!event) return;
      if(event.section === this.order.status){
        this.scrollOffset = event.top;
      }
    });
  }

  initializeStartingCoOrdinates(event: MouseEvent){
    this.startingCardCoOrdinates = {
      x: event.clientX,
      y: event.clientY
    }
  }

  transformCard(up: number, right: number, width: string, height: string){
    this.style = `transform: translate(${right}px, ${up - this.scrollOffset}px); width: ${width}; height: ${height}`;
  }

  getDishName(id: number){
    return DISHES[id];
  }
}
