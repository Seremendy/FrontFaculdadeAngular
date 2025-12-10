import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaCreate } from './matricula-create';

describe('MatriculaCreate', () => {
  let component: MatriculaCreate;
  let fixture: ComponentFixture<MatriculaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
