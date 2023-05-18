import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  debounceTime,
  fromEvent,
  repeat,
  skipUntil,
  takeUntil,
} from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { WorkflowSectionComponent } from '../../molecules/workflow-section/workflow-section.component';
import { WorkflowPageComponent } from '../../pages/workflow/workflow-page.component';

type TicketStatusOptions = {
  [key: string]: string;
};

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements AfterViewInit {
  @Input() ticket: Ticket;

  move$: Observable<MouseEvent>;
  down$: Observable<MouseEvent>;
  up$: Observable<MouseEvent>;
  windowResize$: Observable<Event>;
  startingCardCoOrdinates: { x: number; y: number } | null;
  style = '';
  allowTransitionClass = '';
  cardIsMoving = false;
  cardDimensions: { width: number; height: number };
  scrollOffset: number = 0;

  PRIORITY_COLORS: TicketStatusOptions = {
    low: '#2995c7',
    medium: '#ec9304',
    high: '#e53935',
  };

  @ViewChild('ticketElement') ticketElement: ElementRef;

  constructor(
    private workflow: WorkflowPageComponent,
    private workflowSection: WorkflowSectionComponent
  ) {}

  @HostBinding('style.z-index') get invalid() {
    return this.cardIsMoving ? 100 : 'unset';
  }

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

  getCardDimensions() {
    this.cardDimensions = {
      width: this.ticketElement.nativeElement.offsetWidth - 20,
      height: this.ticketElement.nativeElement.offsetHeight - 20,
    };
  }

  initializeObservables() {
    this.down$ = fromEvent<MouseEvent>(
      this.ticketElement.nativeElement,
      'mousedown'
    );
    this.move$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.up$ = fromEvent<MouseEvent>(
      this.ticketElement.nativeElement,
      'mouseup'
    );
    this.windowResize$ = fromEvent<Event>(window, 'resize').pipe(
      debounceTime(100)
    );
  }

  watchForCardDrop() {
    this.up$.subscribe((event) => {
      this.workflow.cardDrop$.next({
        clientX: event.clientX,
        clientY: event.clientY,
        order: this.ticket,
      });
      this.startingCardCoOrdinates = null;
      setTimeout(() => {
        this.cardIsMoving = false;
        this.transformCard(0, 0, 'unset', 'unset');
      }, 300);
    });
  }

  watchForCardMove() {
    this.move$
      .pipe(skipUntil(this.down$), takeUntil(this.up$), repeat())
      .subscribe((event) => {
        this.cardIsMoving = true;
        this.workflow.moveCard$.next({
          clientX: event.clientX,
          clientY: event.clientY,
          order: this.ticket,
        });

        this.allowTransitionClass = '';
        if (!this.startingCardCoOrdinates)
          return this.initializeStartingCoOrdinates(event);

        const verticalChange = event.clientY - this.startingCardCoOrdinates.y;
        const horizontalChange = event.clientX - this.startingCardCoOrdinates.x;
        this.transformCard(
          verticalChange,
          horizontalChange,
          this.cardDimensions.width + 'px',
          this.cardDimensions.height + 'px'
        );
      });
  }

  watchForResetCard() {
    this.workflow.resetCard$.subscribe((order: Ticket | null) => {
      if (!this.cardThatWasJustDroppedIsThisCard(order?._id)) return;
      this.allowTransitionClass = 'allow-transition';
      this.scrollOffset = 0;
      this.transformCard(
        0,
        0,
        this.cardDimensions.width + 'px',
        this.cardDimensions.height + 'px'
      );
    });
  }

  cardThatWasJustDroppedIsThisCard(dropCardId: string | undefined) {
    return dropCardId === this.ticket._id;
  }

  watchForWindowResize() {
    this.windowResize$.subscribe(() => {
      this.getCardDimensions();
    });
  }

  watchForSectionScroll() {
    this.workflowSection.cardContainerScrollTop$
      .pipe(takeUntil(this.down$))
      .subscribe((event) => {
        if (!event) return;
        if (event.section === this.ticket.status) {
          this.scrollOffset = event.top;
        }
      });
  }

  initializeStartingCoOrdinates(event: MouseEvent) {
    this.startingCardCoOrdinates = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  transformCard(up: number, right: number, width: string, height: string) {
    this.style = `transform: translate(${right}px, ${
      up - this.scrollOffset
    }px); width: ${width}; height: ${height}`;
  }
}
