import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMisDatosComponent } from './form-mis-datos.component';

describe('FormMisDatosComponent', () => {
  let component: FormMisDatosComponent;
  let fixture: ComponentFixture<FormMisDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMisDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
