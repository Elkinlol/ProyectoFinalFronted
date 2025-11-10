import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlace } from './card-place';

describe('CardPlace', () => {
  let component: CardPlace;
  let fixture: ComponentFixture<CardPlace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPlace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
