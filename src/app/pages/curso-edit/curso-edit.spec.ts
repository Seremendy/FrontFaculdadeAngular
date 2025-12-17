import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEditComponent } from './curso-edit.component';

describe('CursoEditComponent', () => {
  let component: CursoEditComponent;
  let fixture: ComponentFixture<CursoEditComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
