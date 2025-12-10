import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCreate } from './nota-create';

describe('NotaCreate', () => {
  let component: NotaCreate;
  let fixture: ComponentFixture<NotaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
