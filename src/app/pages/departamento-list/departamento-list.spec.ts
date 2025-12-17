import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoListComponent } from './departamento-list.component';

describe('DepartamentoList', () => {
  let component: DepartamentoListComponent;
  let fixture: ComponentFixture<DepartamentoListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
