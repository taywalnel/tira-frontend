import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTimelineSectionComponent } from './order-timeline-section.component';

describe('OrderTimelineSectionComponent', () => {
  let component: OrderTimelineSectionComponent;
  let fixture: ComponentFixture<OrderTimelineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTimelineSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTimelineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
