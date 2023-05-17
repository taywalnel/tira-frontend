import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent } from 'rxjs';
import { TICKET_STATUS_LABELS } from 'src/app/constants/ticketStatus';
import { Ticket } from 'src/app/models/ticket';
import { ModalService } from 'src/app/services/modalService/modal.service';

export interface ScrollSectionTop {
  section: string,
  top: number,
}

@Component({
  selector: 'app-workflow-section',
  templateUrl: './workflow-section.component.html',
  styleUrls: ['./workflow-section.component.scss'],
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
export class WorkflowSectionComponent implements AfterViewInit {
  @Input() tickets: Ticket[] = [];
  @Input() sectionType: string;
  @Input() headerColor: string = '';
  @Input() addMode: boolean = false;
  @Input() showCount: boolean = true;
  @Input() isHovering: boolean = false;

  TICKET_STATUS_LABELS = TICKET_STATUS_LABELS;

  private cardContainerScroll$: Observable<MouseEvent>;
  public cardContainerScrollTop$: Subject<ScrollSectionTop> = new BehaviorSubject<any>(null);


  @ViewChild('ticketContainer') ticketContainer: ElementRef;

  constructor(private modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.cardContainerScroll$ = fromEvent<MouseEvent>(this.ticketContainer.nativeElement, 'scroll');
    this.watchForScroll();
  }

  watchForScroll(){
    this.cardContainerScroll$.subscribe((scrollEvent: any) => {
      const scrollOffset = scrollEvent.srcElement.scrollTop;
      this.cardContainerScrollTop$.next({ section: this.sectionType, top: scrollOffset });
    })
  }

  handleCreateTicket(){
    this.modalService.openModal('createTicket', {status: this.sectionType});
  }
}
