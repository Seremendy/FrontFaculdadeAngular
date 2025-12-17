import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaCreateComponent } from './matricula-create.component';

describe('MatriculaCreateComponent', () => {
  let component: MatriculaCreateComponent;
  let fixture: ComponentFixture<MatriculaCreateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
