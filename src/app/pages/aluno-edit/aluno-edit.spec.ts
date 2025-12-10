import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoEdit } from './aluno-edit';

describe('AlunoEdit', () => {
  let component: AlunoEdit;
  let fixture: ComponentFixture<AlunoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
