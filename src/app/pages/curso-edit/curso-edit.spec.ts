import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEdit } from './curso-edit';

describe('CursoEdit', () => {
  let component: CursoEdit;
  let fixture: ComponentFixture<CursoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
