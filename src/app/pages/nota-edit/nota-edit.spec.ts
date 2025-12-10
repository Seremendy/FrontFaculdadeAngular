import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEdit } from './nota-edit';

describe('NotaEdit', () => {
  let component: NotaEdit;
  let fixture: ComponentFixture<NotaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
