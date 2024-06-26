import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderClientsComponent } from './header-clients.component';

describe('HeaderClientsComponent', () => {
  let component: HeaderClientsComponent;
  let fixture: ComponentFixture<HeaderClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
