import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoFormComponent } from './departamento-form.component';

describe('DepartamentoForm', () => {
  let component: DepartamentoFormComponent;
  let fixture: ComponentFixture<DepartamentoFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
