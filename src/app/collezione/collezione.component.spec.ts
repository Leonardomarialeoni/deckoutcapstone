import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollezioneComponent } from './collezione.component';

describe('CollezioneComponent', () => {
  let component: CollezioneComponent;
  let fixture: ComponentFixture<CollezioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollezioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
