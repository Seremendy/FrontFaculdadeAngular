import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaListComponent } from './nota-list.component';

describe('NotaListComponent', () => {
  let component: NotaListComponent;
  let fixture: ComponentFixture<NotaListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
