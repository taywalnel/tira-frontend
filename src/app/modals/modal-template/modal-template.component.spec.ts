import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemplateComponent } from './modal-template.component';

describe('ModalComponent', () => {
  let component: ModalTemplateComponent;
  let fixture: ComponentFixture<ModalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
