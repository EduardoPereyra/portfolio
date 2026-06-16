import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmailCheckout } from './modal-email-checkout';

describe('ModalEmailCheckout', () => {
  let component: ModalEmailCheckout;
  let fixture: ComponentFixture<ModalEmailCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEmailCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEmailCheckout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
