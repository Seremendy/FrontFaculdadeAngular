import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEdit } from './professor-edit';

describe('ProfessorEdit', () => {
  let component: ProfessorEdit;
  let fixture: ComponentFixture<ProfessorEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
