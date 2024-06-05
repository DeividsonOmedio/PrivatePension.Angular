import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuschasesComponent } from './puschases.component';

describe('PuschasesComponent', () => {
  let component: PuschasesComponent;
  let fixture: ComponentFixture<PuschasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuschasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuschasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
