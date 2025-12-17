import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEditComponent } from './nota-edit.component';

describe('NotaEditComponent', () => {
  let component: NotaEditComponent;
  let fixture: ComponentFixture<NotaEditComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
