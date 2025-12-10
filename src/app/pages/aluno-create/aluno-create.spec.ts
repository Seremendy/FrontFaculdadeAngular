import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCreate } from './aluno-create';

describe('AlunoCreate', () => {
  let component: AlunoCreate;
  let fixture: ComponentFixture<AlunoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
