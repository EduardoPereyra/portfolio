import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSkillItem } from './modal-skill-item';

describe('ModalSkillItem', () => {
  let component: ModalSkillItem;
  let fixture: ComponentFixture<ModalSkillItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSkillItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSkillItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
