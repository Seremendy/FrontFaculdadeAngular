import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCreateComponent } from './aluno-create.component';

describe('AlunoCreate', () => {
  let component: AlunoCreateComponent;
  let fixture: ComponentFixture<AlunoCreateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
