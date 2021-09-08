import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateAccessComponent } from './evaluate-access.component';

describe('EvaluateAccessComponent', () => {
  let component: EvaluateAccessComponent;
  let fixture: ComponentFixture<EvaluateAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
