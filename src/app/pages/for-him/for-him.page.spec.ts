import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForHimPage } from './for-him.page';

describe('ForHimPage', () => {
  let component: ForHimPage;
  let fixture: ComponentFixture<ForHimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForHimPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForHimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
