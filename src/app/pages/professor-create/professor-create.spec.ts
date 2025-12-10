import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCreate } from './professor-create';

describe('ProfessorCreate', () => {
  let component: ProfessorCreate;
  let fixture: ComponentFixture<ProfessorCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
